import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";

type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
    round: number;
};

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    return { world: World.init(size, path, towers), actors: Actor.init(size, path, towers), round: 0 };
}

function nextRound(gameState: GameState): GameState {
    return { ...gameState, round: gameState.round + 1 };
}

function moveAll(gameState: GameState): GameState {
    const updatedWorld = gameState.world;
    const updatedActors = gameState.actors.map(actor => {
        // If actor isnt an enemy (so he can ask to move)
        if (!Actor.isEnemy(actor))
            return { ...actor };

        // Convert the actor as an enemy to be able to acces enemies fields
        const currentActor: Actor.Enemy = Actor.asEnemy(actor);

        // The actor request a position to move
        const requestedPosition: Point.Point = currentActor.actions.move(currentActor, gameState.world);

        // If the position is a accessible (path + free) according to the motor
        console.log(`-> ${currentActor.type} ask for (x:${requestedPosition.x}, y:${requestedPosition.y}), free according to motor : ${World.isAccessible(requestedPosition, gameState.world)}`);

        return { ...actor };
    });

    // Return updated game state with updated actors
    return { ...gameState, world: updatedWorld , actors: updatedActors };
}

export {
    GameState,
    init,
    nextRound,
    moveAll
};
