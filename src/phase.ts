import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";
import * as Game from "./game.js";

type Phase = {
    name: string;
    proposal: Actor.Action;  
    resolve: ( game: Game.GameState, proposals: Array<Point.Point>, k: number) => Game.GameState;
};

function computePhases(game: Game.GameState): Array<Phase> {
    // function allPhases(actors: Array<Actor.Actor>, phases: Array<Phase>): Array<Phase> {
    //     function isPhaseExists(newPhase: Phase, listPhases: Array<Phase>): boolean {
    //         if (listPhases.length === 0) {
    //             return false
    //         }
    //         if (listPhases[0].proposal === newPhase.proposal) {
    //             return true;
    //         }
    //         return isPhaseExists(newPhase, listPhases.splice(1));
    //     }

    //     if (actors.length === 0) {
    //         return phases;
    //     }

    //     if isPhaseExists(actors[0].actions)

    // }
    // return allPhases(game.actors, []);
    const phases: Array<Phase> = [{name: "move", proposal: Actor.askForMove, resolve: Game.resolveMove}];//, resolve}];
    return phases;
}

export {
    Phase,
    computePhases
};