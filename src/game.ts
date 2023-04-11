import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";

type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
};

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    return { world: World.init(size, path, towers), actors: Actor.init(size, path, towers) };
}

export {
    GameState,
    init,
};
