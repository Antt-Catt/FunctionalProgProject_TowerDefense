import * as Point from "./point.js";
import * as World from "./world.js";

type GameState = {
    world: World.World;
    // actors: Array<Actors.Actors>;
};

function init(path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    return { world: World.init(5, path, towers) };
}

export {
    GameState,
    init,
};
