import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";

type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
    path: Array<Point.Point>;
    round: number;
    end: boolean;
};

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): GameState {
    return { world: World.init(size, path, towers), actors: Actor.init(size, path, towers), path: path, round: 0, end: false };
}

function nextRound(gameState: GameState): GameState {
    return { ...gameState, round: gameState.round + 1 };
}

function moveAll(gameState: GameState): GameState {
    let updatedWorld: World.World = gameState.world;
    let end: boolean = false;
    const updatedActors = gameState.actors.map(actor => {
        // If actor isnt an enemy (so he can ask to move)
        if (!Actor.isEnemy(actor))
            return { ...actor };

        // Convert the actor as an enemy to be able to acces enemies fields
        const currentActor: Actor.Enemy = Actor.asEnemy(actor);

        // The actor request a position to move
        const requestedPosition: Point.Point = currentActor.actions.move(currentActor, gameState.world);
        if (Actor.endPath(currentActor))
            end = true;
        // console.error(`-> ${currentActor.type} ask for (x:${requestedPosition.x}, y:${requestedPosition.y}), free according to motor : ${World.isFree(requestedPosition, gameState.world)}`);
        else if (World.isFree(requestedPosition, gameState.world)) {
            if (currentActor.position !== Actor.startPosition)
                updatedWorld = World.setFree(currentActor.position, true, updatedWorld);
            updatedWorld = World.setFree(requestedPosition, false, updatedWorld);
            // console.error(`-> ${currentActor.type} move from (x: ${currentActor.position.x}, y: ${currentActor.position.y}) to (x: ${requestedPosition.x}, y: ${requestedPosition.y}).`);
            return Actor.moveEnemy(currentActor);
        }

        // The move wasn't possible
        return { ...actor };
    });

    // Return updated game state with updated actors
    return { ...gameState, world: updatedWorld, actors: updatedActors, end: end };
}


function shootAll(gameState: GameState): GameState {
    let updatedWorld: World.World = gameState.world;
    let end: boolean = false;
    const updatedActors = gameState.actors.map(actor => {
        if (Actor.isEnemy(actor))
            return { ...actor };

        const currentActor: Actor.Tower = Actor.asTower(actor);

        const requestShoot: Point.Point = currentActor.actions.attack(currentActor, gameState.world);
    }
}


export {
    GameState,
    init,
    nextRound,
    moveAll
};
