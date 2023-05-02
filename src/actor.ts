import * as World from "./world.js";
import * as Point from "./point.js";

const startPosition: Point.Point = { x: -1, y: -1 };

enum ActorType {
    Enemy = "enemy",
    Tower = "tower",
}

type Actor = {
    type: ActorType;
    position: Point.Point;
    // characteristics?: Record<string, string | number>;
}

type Action = (actor: Enemy | Tower, world: World.World) => Point.Point;

type Enemy = Actor & {
    type: ActorType.Enemy;
    path: Array<Point.Point>;
    actions: {
        move: Action
    }
    // health: number;
    // speed: number;
}

type Tower = Actor & {
    type: ActorType.Tower;
    damage: number;
    range: number;
    // cooldown: number;
    shootable: Array<Point.Point>;
    actions: {
        attack: Action;
    }
}

const askForMove: Action = (actor: Enemy): Point.Point => { return actor.path[0]; };

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): Array<Actor> {

    function initTowers(towers: Array<Point.Point>): Array<Actor> {
        const towersOk = towers.filter(point => point.x < size && point.y < size);
        return towersOk.map(pos => {
            const tower: Tower = {
                type: ActorType.Tower,
                position: pos,
                // characteristics: { attack: "unique" },
                damage: 5,
                range: 3,
                // cooldown: 1,
                shootable: [],
                actions: {
                    attack: tiiir
                }
            };
            return {...tower, shootable: reachable(path, tower.position, tower.range)};
        });
    }

    function initEnemies(n: number, enemies: Array<Enemy>): Array<Actor> {
        if (n === 0)
            return enemies;
        return initEnemies(n - 1, enemies.concat({
            type: ActorType.Enemy,
            position: startPosition,
            path: path.slice(), // Slice is used to create a copy of path for each actor
            // health: 10,
            // speed: 1,
            actions: {
                move: askForMove
            }
        }));
    }

    const actors = initTowers(towers).concat(initEnemies(2, []));

    return actors;
}

function isEnemy(actor: Actor): boolean {
    return (actor.type === ActorType.Enemy);
}

function asEnemy(actor: Actor): Enemy {
    return actor as Enemy;
}

function moveEnemy(actor: Enemy): Enemy {
    return { ...actor, position: actor.path.shift() as Point.Point };
}

function endPath(actor: Enemy): boolean {
    return (actor.path.length === 0);
}


function asTower(actor: Actor): Tower {
    return actor as Tower;
}

function isTower(actor: Actor): boolean{
    return (actor.type === ActorType.Tower);
}


function getActorType(actor: Actor): Enemy | Tower {
    if (actor.type === ActorType.Enemy)
        return actor as Enemy;
    return actor as Tower;
}

function distance_manhattan(r: number, A: Point.Point, B: Point.Point): boolean {
    return (Math.abs(B.x - A.x) + Math.abs(B.y - A.y) <= r);
}

// doit etre appelee dans le main pour generer le champs shootable des tours
function reachable(path: Array<Point.Point>, p: Point.Point, r: number): Array<Point.Point> {
    const perimeter: Array<Point.Point> = [];
    function reachableRec(chemin: Array<Point.Point>, peri: Array<Point.Point>, p: Point.Point, r: number): Array<Point.Point> {
        if (chemin.length === 0)
            return peri;
        else {
            const head: Point.Point = chemin[0];

            if (distance_manhattan(r, head, p))
                peri = [...peri, head];
            return reachableRec(chemin.slice(1, chemin.length), peri, p, r);
        }
    }
    return reachableRec(path, perimeter, p, r);
}


function isthereanybody(reach: Array<Point.Point>, world: World.World): Point.Point {
    if (reach.length === 0)
        return startPosition;
    if (!World.isFree(reach[reach.length - 1], world))
        return reach[reach.length - 1];
    return isthereanybody(reach.slice(0, -1), world);
}

const tiiir: Action = (actor: Tower, world: World.World): Point.Point => {
    return isthereanybody(actor.shootable,world);
};


// function kill(tile: Point.Point, world: World.World): boolean {
//     if (world.points[tile.y][tile.x].toString() === "*")
//         return true;
//     return false;
// }

// function TowerAttack(actor: Actor, world: World.World): Point.Point {
//     const tower = actor as Tower;
//     function recAttack(tab: Array<Point.Point>, world: World.World): Point.Point {
//         const k: Array<Point.Point> = tab.slice(-1);
//         if (tab.length === 0)
//             return { x: -1, y: -1 };
//         if (kill(k[0], world))
//             return k[0];
//         return recAttack(tab, world);
//     }
//     return recAttack(tower.shootable, world);
// }

export {
    startPosition,
    ActorType,
    Actor,
    Action,
    Enemy,
    Tower,
    init,
    askForMove,
    isEnemy,
    asEnemy,
    moveEnemy,
    asTower,
    isTower,
    endPath,
    getActorType,
    distance_manhattan,
    reachable,
    isthereanybody,
    tiiir
    // TowerAttack,
    // kill
};
