import * as Point from "./point.js";
import * as World from "./world.js";
import * as Actor from "./actor.js";
import * as Path from "./path.js";

type GameState = {
    world: World.World;
    actors: Array<Actor.Actor>;
    path: Array<Point.Point>;
    round: number;
    end: boolean;
};


function init(size: number): GameState {
    return { world: World.init(size, Path.totalPath, Path.arrayTower), actors: Actor.init(size), path: Path.totalPath, round: 1, end: false };
}

function nextRound(gameState: GameState): GameState {
    return { ...gameState, round: gameState.round + 1 };
}

function resolveMove(game: GameState, proposals: Array<Point.Point>, k: number): GameState {
    const currentActor: Actor.Enemy = Actor.asEnemy(game.actors[k]); 
    const requestedPosition: Point.Point = proposals[k];
    
    if (Actor.endPath(currentActor))
        return {...game, end: true};
    else if (World.isFree(requestedPosition, game.world)) {
        const newWorld: World.World = setFreeMove(currentActor.position, requestedPosition, game.world);
        const newActors: Array<Actor.Actor> = [...game.actors.slice(0, k), Actor.moveEnemy(currentActor), ...game.actors.slice(k + 1)]; // 
        return { ...game, world : newWorld, actors : newActors };
    }
      // The move wasn't possible
    return { ...game};
}

function setFreeMove(src: Point.Point, dst: Point.Point, world: World.World): World.World {
    if (src !== Actor.startPosition) {
        return World.setFree(dst, false, World.setFree(src, true, world));
    }
    return World.setFree(dst, false, world);
}

function resolveShoot(game: GameState, proposals:  Array<Point.Point>, k: number): GameState {
    const targetPlace: Point.Point = proposals[k];
    if (World.isFree(targetPlace, game.world)) {
        return game;
    }
    const targettingTower: Actor.Tower = Actor.asTower(game.actors[k]);
    const targetIdx: number = getIdx(game.actors, targetPlace, 0);
    const targetActor: Actor.Enemy = Actor.asEnemy(game.actors[targetIdx]);
    //case where the enemy is being killed
    if ( targetActor.health <= targettingTower.damage) {
        const newDead: Actor.Enemy = {...targetActor, path: [Actor.startPosition], position: Actor.startPosition, health: 0};
        return {...game, actors: newActors(newDead, game, targetIdx), world: World.setFree(targetPlace, true, game.world)};
    }
    else {
    const newActor: Actor.Enemy = removeHealth(targetActor, targettingTower.damage);
    return {...game, actors: newActors(newActor, game, targetIdx)};
    }
}

//return new array of actors where the actor in k-position is shifted with newActor in the game.actors array
function newActors(newActor: Actor.Actor, game: GameState, k: number): Array<Actor.Actor> {
    return [...game.actors.slice(0, k), newActor, ...game.actors.slice(k + 1)];
}

//it's in the name of the function xD
function removeHealth(enemy: Actor.Enemy, damage: number): Actor.Enemy {
    const newHealth: number = enemy.health - damage;
    return {...enemy, health: newHealth};
}

//return the actor in postion pos in array actors
function getIdx(actors: Array<Actor.Actor>, pos: Point.Point, k: number): number{
    if (actors[0].position === pos) {
        return k;
    }
    else {
        return getIdx(actors.slice(1), pos, k + 1);
    }
}

/*
function shootAll(gameState: GameState): GameState {
    let updatedWorld: World.World = gameState.world;
    let end: boolean = false;
    const updatedActors = gameState.actors.map(actor => {
        if (Actor.isEnemy(actor))
            return { ...actor };

        const currentActor: Actor.Tower = Actor.asTower(actor);

        const requestShoot: Point.Point = currentActor.actions.attack(currentActor, gameState.world);
    });
    return gameState;
}
*/

function resolveProposals( game: GameState, proposals: Array<Point.Point>, funcName: (game: GameState, list: Array<Point.Point>, n: number) => GameState, k: number): GameState {
    if ( k === proposals.length ) {
        return game;
    }
    else {
        if ( proposals[k] !== Actor.startPosition) { 
            const newGameState: GameState = funcName(game, proposals, k);
            return resolveProposals(newGameState, proposals, funcName, k + 1);
        } 
        return resolveProposals(game, proposals, funcName, k + 1);
    }
}

export {
    GameState,
    init,
    nextRound,
    resolveMove,
    resolveShoot,
    resolveProposals
};
