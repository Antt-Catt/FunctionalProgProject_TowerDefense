import * as World from "./world.js";

type GameState = {
    world: World.World;
    // actors: Array<Actors.Actors>;
};

function init(): GameState {
    return { world: World.init(10) };
}

export {
    GameState,
    init,
};
