import * as World from "./world.js";
import { Point } from "./world.js";
import * as Path from "./path.js";

const startPosition: Point.Point = { x: -1, y: -1 };

/**
 * An enumeration of the types of actors in the game.
 * @readonly
 * @enum {string}
 * @property {string} Enemy - Represents an enemy actor type.
 * @property {string} Tower - Represents a tower actor type.
 */
enum ActorType {
    Enemy = "enemy",
    Tower = "tower",
}

/**
 * An object representing an actor in the game.
 * @typedef {Object} Actor
 * @property {ActorType} type - The type of the actor.
 * @property {Point} position - The position of the actor.
 * @property {Object<string, Action>} actions - A dictionary of available actions for the actor.
 */
type Actor = {
    type: ActorType;
    position: Point.Point;
    actions: Record<string, Action>;
}

/**
 * Action function type that represent a request from an actor.
 * @typedef {Function} Action
 * @param {Enemy|Tower} actor - The actor making the request.
 * @param {World.World} world - The world in which the actor exists.
 * @returns {Point.Point} - The resulting Point.Point object.
 */
type Action = (actor: Enemy | Tower, world: World.World) => Point.Point;

/**
 * An Enemy actor type, which is an Actor with additional properties type, path, health, and initialHealth.
 * @typedef {Object} Enemy
 * @property {ActorType.Enemy} type - The type of actor, which is always ActorType.Enemy.
 * @property {Array<Point.Point>} path - The path the Enemy follows in the World.
 * @property {number} health - The current health of the Enemy.
 * @property {number} initialHealth - The initial health of the Enemy.
 */
type Enemy = Actor & {
    type: ActorType.Enemy;
    path: Array<Point.Point>;
    health: number;
    initialHealth: number;
}

/**
 * A Dead actor type, which is an Actor.
 * @typedef {Object} Dead
 * @property {Actor} - The type of actor, which is always Actor.
 */
type Dead = Actor;

/**
 * A Tower actor type, which is an Actor with additional properties type, damage, range, and shootable.
 * @typedef {Object} Tower
 * @property {ActorType.Tower} type - The type of actor, which is always ActorType.Tower.
 * @property {number} damage - The damage dealt by the Tower.
 * @property {number} range - The range of the Tower.
 * @property {Array<Point.Point>} shootable - The list of points at which the Tower can shoot.
*/
type Tower = Actor & {
    type: ActorType.Tower;
    damage: number;
    range: number;
    shootable: Array<Point.Point>;
}

/**
 * Return a new array of Actors where the actor in k-position is shifted with newActor in the game.actors array.
 * @param {Actor} newActor - The new actor to replace the existing actor.
 * @param {Array<Actor>} actors - The array of actors to update.
 * @param {number} k - The index of the actor to replace.
 * @returns {Array<Actor>} - A new array of actors with the updated actor at the specified index.
 */
function newActors(newActor: Actor, actors: Array<Actor>, k: number): Array<Actor> {
    return [...actors.slice(0, k), newActor, ...actors.slice(k + 1)];
}

/**
 * It's in the name of the function xD.
 * @param {Enemy} enemy - The enemy to reduce health on.
 * @param {number} damage - The amount of health to remove from the enemy.
 * @returns {Enemy} - A new Enemy object with the updated health.
 */
function removeHealth(enemy: Enemy, damage: number): Enemy {
    const newHealth: number = enemy.health - damage;
    return {...enemy, health: newHealth};
}

/**
 * Returns the Actor in postion pos in array actors.
 * @param {Array<Actor>} actors - The array of actors to search for a matching position.
 * @param {Point.Point} pos - The position to match against each actor's position.
 * @param {number} k - The current index of the first actor in the original array.
 * @returns {number} - The index of the first actor whose position matches the specified point, or -1 if no match is found.
 */
function getIdx(actors: Array<Actor>, pos: Point.Point, k: number): number{
    if (Point.isEqual(actors[0].position, pos)) {
        return k;
    }
    else {
        return getIdx(actors.slice(1), pos, k + 1);
    }
}

const askForMove: Action = (actor: Enemy): Point.Point => { return actor.path[0]; };

/**
 * Initializes an array of tower actors based on a given set of tower positions.
 * @function initTowers
 * @param {Array<Point.Point>} towers - An array of tower positions.
 * @returns {Array<Actor>} - An array of initialized tower actors.
 */
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

/**
 * Calculates the Manhattan distance between two points and returns whether it is less than or equal to a given range.
 * @param {number} r - The range to check against.
 * @param {Point.Point} A - The first point to calculate the distance between.
 * @param {Point.Point} B - The second point to calculate the distance between.
 * @returns {boolean} - Whether the distance is less than or equal to the given range.
 */
function distance_manhattan(r: number, A: Point.Point, B: Point.Point): boolean {
    return (Math.abs(B.x - A.x) + Math.abs(B.y - A.y) <= r);
}

/**
 * Recursive function to calculate the reachable points for a given position and range, must be called in the main to generate the towers shootable fields.
 * @param {Array<Point.Point>} path - The path to search for reachable points.
 * @param {Point.Point} p - The position to search from.
 * @param {number} r - The range of the position.
 * @returns {Array<Point.Point>} - An array of reachable points.
 */
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

/**
 * Finds the first occupied point in an array of points and returns it, if all points are free, the starting position is returned.
 * @param {Array<Point.Point>} reach - An array of points to check for occupation.
 * @param {World.World} world - The game world to check against for occupation.
 * @returns {Point.Point} - The first occupied point in the array or the starting position if all points are free.
 */
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
