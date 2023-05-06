import * as Point from "./point.js";
import * as Game from "./game.js";
import * as Display from "./display.js";
import * as Phase from "./phase.js";
import * as Actor from "./actor.js";

const maxRound: number = 10;
const worldSize: number = 5;
const arrayPath: Array<Point.Point> = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }];
const arrayTower: Array<Point.Point> = [{ x: 1, y: 1 }, { x: 3, y: 3 }];

let gameState: Game.GameState = Game.init(worldSize, arrayPath, arrayTower);

const phases: Array<Phase.Phase> = Phase.computePhases(gameState);

// Times in ms
const timePerRound = 2000;
const timePerPhase = timePerRound / phases.length;

// Print initial world
Display.initDisplay(gameState);
Display.displayInfos(`Game started.`);
Display.displayWorld(gameState);

const interval = setInterval(() => {
    if (!gameState.end && (gameState.round + 1) <= maxRound) {
        // Increment and print the round
        gameState = Game.nextRound(gameState);

        // Move enemies
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

            // Print world and actors
            if (!phases.indexOf(aPhase)) {
                Display.displayInfos(`Turn ${gameState.round} - Phase ${aPhase.name}.`);
                Display.displayWorld(gameState);
            } else {
                setTimeout(() => {
                    Display.displayInfos(`Turn ${gameState.round} - Phase ${aPhase.name}.`);
                    Display.displayWorld(gameState);
                }, timePerPhase * phases.indexOf(aPhase));
            }

            return newGame;
        }, gameState);
    } else {
        clearInterval(interval);
        if (gameState.end)
            Display.displayInfos(`Game lost, an enemy has reached the end of the course !`);
        else if (gameState.round > maxRound)
            Display.displayInfos(`Maximum number of rounds reached !`);
        else
            Display.displayInfos(`Win !`);
    }
}, timePerRound);