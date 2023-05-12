import * as Actor from "./actor.js";
import { Point, World, Path } from "./actor.js";

/**
 * An object representing the current state of the game
 * @typedef {Object} GameState
 * @property {World.World} world - The world object containing information about the game world
 * @property {Array<Actor.Actor>} actors - An array of Actor objects representing the actors in the game
 * @property {Array<Point.Point>} path - An array of Point objects representing the path taken by the actors
 * @property {number} round - The current round of the game
 * @property {boolean} end - A boolean indicating whether the game has ended
 */
type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
    path: Array<Point.Point>;
    round: number;
    end: boolean;
};

/**
 * Initializes a new GameState object with the given size
 * @param {number} size - The size of the game world
 * @returns {GameState} - A new GameState object with the world, actors, path, round, and end properties initialized
 */
function init(size: number): GameState {
    return { world: World.init(size, Path.totalPath, Path.arrayTower), actors: Actor.init(size), path: Path.totalPath, round: 1, end: false };
}

/**
 * Advances the game state to the next round
 * @param {GameState} gameState - The current GameState object
 * @returns {GameState} - A new GameState object with the round property incremented
 */
function nextRound(gameState: GameState): GameState {
    return { ...gameState, round: gameState.round + 1 };
}

/**
 * Resolves a move for an enemy actor in the game based on a set of proposals
 * @param {GameState} game - The current GameState object
 * @param {Array<Point.Point>} proposals - An array of Point representing the proposed moves for each enemy actor
 * @param {number} k - The index of the enemy actor for which to resolve the move
 * @returns {GameState} - A new GameState object with updated world and actors properties based on the resolved move
 */
function resolveMove(game: GameState, proposals: Array<Point.Point>, k: number): GameState {
    const currentActor: Actor.Enemy = Actor.asEnemy(game.actors[k]);
    const requestedPosition: Point.Point = proposals[k];

    if (Actor.endPath(currentActor))
        return { ...game, end: true };
    else if (World.isFree(requestedPosition, game.world)) {
        const newWorld: World.World = setFreeMove(currentActor.position, requestedPosition, game.world);
        const newActors: Array<Actor.Actor> = [...game.actors.slice(0, k), Actor.moveEnemy(currentActor), ...game.actors.slice(k + 1)]; // 
        return { ...game, world: newWorld, actors: newActors };
    }
    // The move wasn't possible
    return { ...game };
}

/**
 * Sets the free status of two points in the game world to update the position of an actor
 * @param {Point.Point} src - The current position of the actor
 * @param {Point.Point} dst - The proposed new position of the actor
 * @param {World.World} world - The current game world
 * @returns {World.World} - A new game world with updated free status for the source and destination points
 */
function setFreeMove(src: Point.Point, dst: Point.Point, world: World.World): World.World {
    if (src !== Actor.startPosition) {
        return World.setFree(dst, false, World.setFree(src, true, world));
    }
    return World.setFree(dst, false, world);
}

/**
 * Resolves a shoot by checking if the target place is free, and then dealing damage to the targeted enemy.
 * @param {GameState} game - The current state of the game.
 * @param {Array<Point.Point>} proposals - An array of Point objects representing possible targets.
 * @param {number} k - The index of the current target being considered in the proposals array.
 * @returns {GameState} - The updated state of the game after the shoot action has been resolved.
 */
function resolveShoot(game: GameState, proposals: Array<Point.Point>, k: number): GameState {
    const targetPlace: Point.Point = proposals[k];
    if (World.isFree(targetPlace, game.world)) {
        return game;
    }
    const targettingTower: Actor.Tower = Actor.asTower(game.actors[k]);
    const targetIdx: number = Actor.getIdx(game.actors, targetPlace, 0);
    const targetActor: Actor.Enemy = Actor.asEnemy(game.actors[targetIdx]);
    //case where the enemy is being killed
    if (targetActor.health <= targettingTower.damage) {
        const newDead: Actor.Enemy = { ...targetActor, path: [Actor.startPosition], position: Actor.startPosition, health: 0 };
        return { ...game, actors: Actor.newActors(newDead, game.actors, targetIdx), world: World.setFree(targetPlace, true, game.world) };
    }
    else {
        const newActor: Actor.Enemy = Actor.removeHealth(targetActor, targettingTower.damage);
        return { ...game, actors: Actor.newActors(newActor, game.actors, targetIdx) };
    }
}

/**
 * Resolves a list of proposals in the game by iterating through each proposal and applying a given function to it.
 * @param {GameState} game - The current state of the game.
 * @param {Array<Point.Point>} proposals - An array of Point objects representing the proposed targets.
 * @param {function} funcName - The function to apply to each proposal.
 * @param {number} k - The index of the current proposal being considered in the proposals array.
 * @returns {GameState} - The updated state of the game after all proposals have been resolved.
 */
function resolveProposals(game: GameState, proposals: Array<Point.Point>, funcName: (game: GameState, list: Array<Point.Point>, n: number) => GameState, k: number): GameState {
    if (k === proposals.length) {
        return game;
    }
    else {
        if (proposals[k] !== Actor.startPosition) {
            const newGameState: GameState = funcName(game, proposals, k);
            return resolveProposals(newGameState, proposals, funcName, k + 1);
        }
        return resolveProposals(game, proposals, funcName, k + 1);
    }
}

export {
    GameState,
    init,
    nextRound,
    resolveMove,
    setFreeMove,
    resolveShoot,
    resolveProposals,
    Point,
    Actor,
    World,
    Path
};
