import * as World from "./world.js";

type GameStateType = {
    world: World.WorldType;
    // actors: Array<Actors.ActorsType>;
};

function init(): GameStateType {
    return { world: World.init(10) };
}

export {
    GameStateType,
    init,
};
