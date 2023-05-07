import * as Point from "./point.js";
import * as Game from "./game.js";
import * as Display from "./display.js";
import * as Phase from "./phase.js";
import * as Actor from "./actor.js";

const maxRound: number = 60;
const worldSize: number = 15;

let gameState: Game.GameState = Game.init(worldSize);

const phases: Array<Phase.Phase> = Phase.computePhases(gameState);

Display.initDisplay(gameState);

while (!gameState.end && gameState.round <= maxRound) {
    gameState = Game.nextRound(gameState);

    gameState = phases.reduce((game: Game.GameState, aPhase: Phase.Phase) => {
        const proposals: Array<Point.Point> = game.actors.map((anActor) => {
            const actor: Actor.Enemy | Actor.Tower = Actor.getActorType(anActor);
            if (aPhase.name in actor.actions) {
                const prop = aPhase.name;
                return actor.actions[prop](actor, game.world);
            }
            return Actor.startPosition;
        });
        const newGame: Game.GameState = Game.resolveProposals(game, proposals, aPhase.resolve, 0);

        Display.update(gameState);

        return newGame;
    }, gameState);
}

Display.displayAll(gameState, phases.map((elt) => elt.name), maxRound);
