import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";

type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
};

function init(path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    const world = World.init(5, path, towers);
    return { world: world, actors: Actor.init(world, path, towers) };
}

export {
    GameState,
    init,
};
