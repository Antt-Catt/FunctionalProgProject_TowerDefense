import * as Game from "./game.js";
import * as Point from "./point.js";
import * as Display from "./display.js";
import * as World from "./world.js";
import * as Tile from "./tile.js";
import { log } from "console";

console.log("[-] Game started\n");

const arrayPath: Array<Point.Point> = [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2}];

const arrayTower: Array<Point.Point> = [{x:1, y:1}];

const gameState: Game.GameState = Game.init(arrayPath, arrayTower);

console.log("[-] Display the world :");
console.log(Display.displayWorld(gameState.world));
console.log(gameState.actors);

///////////////////////////////////////////// est dans actor.ts

type Actor = {
    position : Point.Point;
    characteristics ?: Record<string, any>; //pour des infos plus specifiques, par ex les tours : attaque de zone ou unique, ralentir etc.
    type : "enemy" | "tower";
}

type Action = (actor: Actor, world: World.World) => number;

type Enemy = Actor & { 
    type : "enemy";
    health: number;
    speed: number;
    /*actions: {
        move: Action;
        // attack: Action;
    }*/
    path: Array<Point.Point>;
}

type Tower = Actor & {
    type : "tower";
    damage : number;
    range : number;
    cooldown : number;
    shootable : Array<Tile.Tile>;
    /*actions: {
        attack: Action;
    }*/
}

//////////////////////////////////////////// à mettre dans actor.ts (ou autre part ?)

function initActors(world: World.World) : Array<Actor> {
    function initTowers(towers: Array<Point.Point>): Array<Actor> {
        const towersOk = towers.filter(point => point.x < world.points.length && point.y < world.points.length);
        return towersOk.map(pt => {
                return { type: "tower",
                position: pt,
                characteristics : {attack : "unique"},
                damage : 5,
                range : 3,
                cooldown : 1,
                shootable : [],
                };
        });
    }
    
    function initEnemies(n: number, enemies: Array<Enemy>): Array<Actor> {
        if (n === 0) {
            return enemies;
        }
        return initEnemies(n - 1, enemies.concat({type : "enemy",
        position : {x:0,y:2},
        health : 10,
        speed : 1,
        path : arrayPath,}));
    }

    const actors = initTowers(arrayTower).concat(initEnemies(2, []));

    return actors;
}

export {
    Actor,
    initActors,
};