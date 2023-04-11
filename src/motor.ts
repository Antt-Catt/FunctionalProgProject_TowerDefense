import * as Game from "./game.js";
import * as Point from "./point.js";
import * as Display from "./display.js";

console.log("[-] main");

const arrayPath: Array<Point.Point> = [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2}];

const arrayTower: Array<Point.Point> = [{x:1, y:1}];

const gameState: Game.GameState = Game.init(arrayPath, arrayTower);
Display.displayWorld(gameState.world);