import * as Point from "./point.js";
import * as World from "./world.js";
// pour les tests
import * as Main from "./main.js";

type GameState = {
    world: World.World;
    actors: Array<Main.Actor>;
};

function init(path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    const world = World.init(5, path, towers);
    return { world: world, actors: Main.initActors(world) };
}

export {
    GameState,
    init,
};
