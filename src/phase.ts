import * as Game from "./game.js";
import { Point, Actor, Path } from "./game.js";

/**
 * A phase of the game
 * @typedef {Object} Phase
 * @property {string} name - The name of the phase
 * @property {function} resolve - A function that resolves the phase and returns a new game state
 *      @param {Game.GameState} game - The current state of the game
 *      @param {Array<Point.Point>} proposals - An array of proposals for the current phase
 *      @param {number} k - A parameter for resolving the phase
 *      @returns {Game.GameState} - A new game state after the phase has been resolved
 */
type Phase = {
    name: string;
    resolve: ( game: Game.GameState, proposals: Array<Point.Point>, k: number) => Game.GameState;
};

/**
 * Computes and returns an array of game phases based on the current state of the game.
 * @param {Game.GameState} game - The current state of the game.
 * @returns {Array<Phase>} An array of game phases, each with a name and a resolve function to update the game state.
 */
function computePhases(game: Game.GameState): Array<Phase> {
    const phases: Array<Phase> = [{name: "move", resolve: Game.resolveMove},{name: "attack", resolve: Game.resolveShoot}];//, resolve}];
    return phases;
}

export {
    Phase,
    computePhases,
    Point,
    Game,
    Actor,
    Path
};