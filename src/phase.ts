import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";
import * as Game from "./game.js"
type Phase = {
    proposal: Actor.Action;  
    resolve: ( game: Game.GameState, proposals: Array<Point.Point>, k: number) => Game.GameState;
};

