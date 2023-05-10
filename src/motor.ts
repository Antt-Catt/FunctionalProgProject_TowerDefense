import * as Phase from "./phase.js";
import { Point, Game, Actor} from "./phase.js";
import * as Display from "./display.js";

function loop(gameState: Game.GameState): Game.GameState {
    if (gameState.end || gameState.round >= maxRound) {
        return gameState;
    }
    console.log(`[-] Turn ${gameState.round}.`);
    const newGame: Game.GameState = phases.reduce((game: Game.GameState, aPhase: Phase.Phase) => {
        const proposals: Array<Point.Point> = game.actors.map((anActor) => {
            const actor: Actor.Enemy | Actor.Tower = Actor.getActorType(anActor);
            if (aPhase.name in actor.actions) {
                const funcName = aPhase.name;
                return actor.actions[funcName](actor, game.world);
            }
            return Actor.startPosition;
        });
        const reducedGame: Game.GameState = Game.resolveProposals(game, proposals, aPhase.resolve, 0);
        
        Display.update(reducedGame);

        return reducedGame;
    },gameState);

    return loop(Game.nextRound(newGame));
}

const maxRound: number = 10;
const worldSize: number = 15;

const gameState: Game.GameState = Game.init(worldSize);

const phases: Array<Phase.Phase> = Phase.computePhases(gameState);

Display.initDisplay(gameState);

const finalGameState: Game.GameState = loop(gameState);

Display.displayAll(finalGameState, phases.map((elt) => elt.name), maxRound);