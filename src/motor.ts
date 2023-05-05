import * as Point from "./point.js";
import * as Game from "./game.js";
import * as Display from "./display.js";
import * as Phase from "./phase.js";
import * as Actor from "./actor.js";

console.log("[-] Game started.\n");

const maxRound: number = 10;
const worldSize: number = 5;
const arrayPath: Array<Point.Point> = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }];
const arrayTower: Array<Point.Point> = [{ x: 1, y: 1 }, { x: 3, y: 3 }];

let gameState: Game.GameState = Game.init(worldSize, arrayPath, arrayTower);

const phases: Array<Phase.Phase> = Phase.computePhases(gameState);

// Print initial world
console.log(`[-] Initial world.`);
console.log(Display.displayWorld(gameState.world));

while (!gameState.end && gameState.round < maxRound) {
    // Increment and print the round
    gameState = Game.nextRound(gameState);
    console.log(`[-] Turn ${gameState.round}.`);
    
    gameState = phases.reduce((game: Game.GameState, aPhase: Phase.Phase) => {
        const proposals: Array<Point.Point> = game.actors.map((anActor) => {
            const actor: Actor.Enemy | Actor.Tower = Actor.getActorType(anActor);
            if (aPhase.name in actor.actions) {
                //console.log(actor.type);
                //console.log(actor.actions.move);
                const prop = aPhase.name;
                //console.log(prop);
                //console.log(actor.actions[prop]);
                return actor.actions[prop](actor, game.world);
            }
            return Actor.startPosition;
        });
        const newGame: Game.GameState = Game.resolveProposals(game, proposals, aPhase.resolve, 0);
        console.log(aPhase.name);
        console.log(Display.displayWorld(gameState.world));
        return newGame;
    },gameState);



    // Move enemies
    // gameState = Game.moveAll(gameState);

    // Print world and actors
    //console.log(Display.displayWorld(gameState.world));
    // console.error(gameState.actors);
}

if (gameState.end)
    console.log(`[-] Game lost, an enemy has reached the end of the course !`);
else if (gameState.round >= maxRound)
    console.log(`[-] Maximum number of rounds reached !`);
