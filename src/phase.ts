import * as Point from "./point.js";
import * as Actor from "./actor.js";
import * as Game from "./game.js";

type Phase = {
    name: string;
    proposal: Actor.Action;  
    resolve: ( game: Game.GameState, proposals: Array<Point.Point>, k: number) => Game.GameState;
};

function computePhases(game: Game.GameState): Array<Phase> {
    const actions: Array<Record<string, Actor.Action>> = game.actors.map((actor) => actor.actions);
    const namesP: Array<string> = [];
    const namesPhases: Array<string> = actions.reduce((names: Array<string>, actions: Record<string, Actor.Action>) => {
        const newNames: Array<string> = names.concat(Object.keys(actions)[0]);
        return newNames;
    }, namesP);
    console.log(namesPhases.filter((x, i) => namesPhases.indexOf(x) === i));
    const phases: Array<Phase> = [{name: "move", proposal: Actor.askForMove, resolve: Game.resolveMove}];
    return phases;
}

export {
    Phase,
    computePhases
};