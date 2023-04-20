import * as Point from "./point.js";
import * as Game from "./game.js";
import * as Display from "./display.js";

console.log("[-] Game started.\n");

const maxRound: number = 2;
const worldSize: number = 5;
const arrayPath: Array<Point.Point> = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }];
const arrayTower: Array<Point.Point> = [{ x: 1, y: 1 }, { x: 3, y: 3 }];

let game: boolean = true;

let gameState: Game.GameState = Game.init(worldSize, arrayPath, arrayTower);

do {
    // Increment and print the round
    gameState = Game.nextRound(gameState);
    console.log(`[-] Turn ${gameState.round}.\n`);

    // Move enemies
    gameState = Game.moveAll(gameState);

    // Print world and actors
    console.log(Display.displayWorld(gameState.world));
    console.log(gameState.actors);
} while (game && gameState.round < maxRound);

game = false;

