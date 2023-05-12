import * as World from "./world.js";
import { Point } from "./world.js";
import * as Path from "./path.js";

const startPosition: Point.Point = { x: -1, y: -1 };

enum ActorType {
    Enemy = "enemy",
    Tower = "tower",
}

type Actor = {
    type: ActorType;
    position: Point.Point;
    actions: Record<string, Action>;
    // characteristics?: Record<string, string | number>;
}

type Action = (actor: Enemy | Tower, world: World.World) => Point.Point;

type Enemy = Actor & {
    type: ActorType.Enemy;
    path: Array<Point.Point>;
    health: number;
    initialHealth: number;
    // speed: number;
}
type Dead = Actor;

type Tower = Actor & {
    type: ActorType.Tower;
    damage: number;
    range: number;
    // cooldown: number;
    shootable: Array<Point.Point>;
}

//return new array of actors where the actor in k-position is shifted with newActor in the game.actors array
function newActors(newActor: Actor, actors: Array<Actor>, k: number): Array<Actor> {
    return [...actors.slice(0, k), newActor, ...actors.slice(k + 1)];
}

//it's in the name of the function xD
function removeHealth(enemy: Enemy, damage: number): Enemy {
    const newHealth: number = enemy.health - damage;
    return {...enemy, health: newHealth};
}

//return the actor in postion pos in array actors
function getIdx(actors: Array<Actor>, pos: Point.Point, k: number): number{
    if (Point.isEqual(actors[0].position, pos)) {
        return k;
    }
    else {
        return getIdx(actors.slice(1), pos, k + 1);
    }
}

const askForMove: Action = (actor: Enemy): Point.Point => { return actor.path[0]; };

function init(size: number): Array<Actor> {

    function initTowers(towers: Array<Point.Point>): Array<Actor> {
        const towersOk = towers.filter(point => point.x < size && point.y < size);
        return towersOk.map(pos => {
            const tower: Tower = {
                type: ActorType.Tower,
                position: pos,
                // characteristics: { attack: "unique" },
                damage: 4,
                range: 3,
                // cooldown: 1,
                shootable: [],
                actions: {
                    attack: tiiir
                }
            };
            return {...tower, shootable: reachable(Path.totalPath, tower.position, tower.range)};
        });
    }

    function initEnemies(n: number, enemies: Array<Enemy>): Array<Actor> {
        if (n === 0)
            return enemies;
        return initEnemies(n - 1, enemies.concat({
            type: ActorType.Enemy,
            position: startPosition,
            path: (n % 2 ? Path.arrayPath1 : Path.arrayPath2).concat(Path.arrayPathEnd), // Slice is used to create a copy of path for each actor
            health: 40,
            initialHealth: 40,
            // speed: 1,
            actions: {
                move: askForMove
            }
        }));
    }

    const actors = initTowers(Path.arrayTower).concat(initEnemies(26, []));

    return actors;
}

function isEnemy(actor: Actor): boolean {
    return (actor.type === ActorType.Enemy);
}

function asEnemy(actor: Actor): Enemy {
    return actor as Enemy;
}


function moveEnemy(actor: Enemy): Enemy {
    return { ...actor, position: Path.getPathHead(actor.path), path: Path.removePathHead(actor.path)};
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
    return isthereanybody(actor.shootable, world);
};

export {
    startPosition,
    ActorType,
    Actor,
    Action,
    Enemy,
    Tower,
    Dead,
    init,
    newActors,
    getIdx,
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
    tiiir,
    removeHealth,
    Point,
    World,
    Path
};
