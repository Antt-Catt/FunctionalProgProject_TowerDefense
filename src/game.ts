import {
    WorldType,
    init as worldInit,
} from "./world.js";

type GameStateType = {
    world: WorldType;
    // actors: Array<ActorsType>;
};

function init(): GameStateType {
    return { world: worldInit(10) };
}

export {
    GameStateType,
    init,
};
