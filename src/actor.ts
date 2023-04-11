import * as World from "./world.js";
import * as Point from "./point.js";

import { sortAndDeduplicateDiagnostics } from "typescript";
import * as Tile from "./tile.js"
function isEmpty<T>(l:Array<T>):boolean{
    const k:Array<any>=[]
    return l === k;
}

type Actor = {
    position: Point.Point;
    characteristics?: Record<string, string | number>;
    type: 'enemy' | 'tower';
}

type Action = (actor: Actor, world: World.World) => Point.Point;

type Enemy = Actor & {
    type: "enemy";
    health: number;
    speed: number;
    // actions: {
    //     move: Action;
    //     attack: Action;
    // }
    path: Array<Point.Point>;
}

type Tower = Actor & {
    type : 'tower';
    damage : number;
    range : number;
    cooldown : number;
    shootable : Array<Point.Point>;
    actions: {
        attack: Action;
    }
}

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): Array<Actor> {

    function initTowers(towers: Array<Point.Point>): Array<Actor> {
        const towersOk = towers.filter(point => point.x < size && point.y < size);
        return towersOk.map(pt => {
            return {
                type: "tower",
                position: pt,
                characteristics: { attack: "unique" },
                damage: 5,
                range: 3,
                cooldown: 1,
                shootable: [],
            };
        });
    }


    function initEnemies(n: number, enemies: Array<Enemy>): Array<Actor> {
        if (n === 0) {
            return enemies;
        }

        return initEnemies(n - 1, enemies.concat({
            type: "enemy",
            position: { x: 0, y: 2 },
            health: 10,
            speed: 1,
            path: path,
        }));
    }

    const actors = initTowers(towers).concat(initEnemies(2, []));

    return actors;
}

function getActorType(actor: Actor): Enemy | Tower {
    if (actor.type === "enemy"){
        return actor as Enemy;
        return actor as Enemy;
    }   
    else{
        return actor as Tower;
        return actor as Tower;
    }
}

const towers: Tower = {
    type : 'tower',
    position : {x:2,y:4},
    characteristics : {attack : 'unique'},
    damage : 10,
    range : 3,
    cooldown : 1,
    shootable : [{x:1, y:2}],
    actions : {
        attack : TowerAttack,
    }
};





function distance_manhattan(r: number, A: Point.Point, B: Point.Point): boolean {
    return (Math.abs(B.x - A.x) + Math.abs(B.y - A.y) <= r);
}
//Le moteur ( normalement ) doit faire un map sur cette fonction, afin de pouvoir bouger toutes les plantes polluées.


// doit etre appelee dans le main pour generer le champs shootable des tours
function reachable(path : Array<Point.Point>, p : Point.Point, r : number):Array<Point.Point>{
    const perimeter : Array<Point.Point> = [];
    function reachableRec(chemin : Array<Point.Point>, peri :Array<Point.Point>, p : Point.Point, r : number):Array<Point.Point>{
        if (chemin.length === 0)
            return peri;
        else {
            const head : Point.Point = path[0];

            if (distance_manhattan(r, head, p))
                peri = [...peri, head];
            return reachableRec(path.slice(1,path.length) ,peri ,p ,r );
        }
    }
    return reachableRec(path, perimeter, p, r);
}
function kill(tile :Point.Point):boolean{
    return false;
}

function TowerAttack(actor: Actor, world: World.World) : Point.Point {
    const tower = actor as Tower;
    function recAttack (tab:Array<Point.Point>):Point.Point{
        const k: Array<Point.Point> = tab.slice(-1);
        if (tab.length === 0 )
            return {x:-1,y:-1};
        if ( kill(k[0]) )
            return k[0];
        return recAttack(tab);
    }   
    return recAttack(tower.shootable)
}

export {
    distance_manhattan,
    towers,
    reachable,
};
// const action: Action = (Enemies)

// function foo(tipe: Actor){
//     if (tipe.type === 'enemy'){

//     }
// }

export {
    Actor,
    init
};
