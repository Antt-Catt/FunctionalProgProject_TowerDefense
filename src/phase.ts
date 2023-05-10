import * as Game from "./game.js";
import { Point, Actor, Path } from "./game.js";

type Phase = {
    name: string;
    resolve: ( game: Game.GameState, proposals: Array<Point.Point>, k: number) => Game.GameState;
};

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