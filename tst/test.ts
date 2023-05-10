import * as Phase from "../src/phase.js";
import { Actor, Path, Game, Point } from "../src/phase.js";
import * as World from "../src/world.js";
import { Tile } from "../src/world.js";

describe('Functional tests for Point', () => {

    test('Point.create', () => {
        const p: Point.Point = Point.create();
        const q: Point.Point = Point.create(5, 12);
        const r: Point.Point = Point.create(1000, -5);
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
        expect(q.x).toBe(5);
        expect(q.y).toBe(12);
        expect(r.x).toBe(1000);
        expect(r.y).toBe(-5);
    });

    test('Point.isEqual', () => {
        const p: Point.Point = Point.create(2, 3);
        const q: Point.Point = Point.create(2, 3);
        const r: Point.Point = Point.create(2, -5);
        expect(Point.isEqual(p, p)).toBe(true);
        expect(Point.isEqual(p, q)).toBe(true);
        expect(Point.isEqual(p, r)).toBe(false);
    });

    test('Point.isInArray', () => {
        const p: Point.Point = Point.create(2, 3);
        const q: Point.Point = Point.create(2, 3);
        const r: Point.Point = Point.create(2, -5);
        const array: Array<Point.Point> = [p, q];
        expect(Point.isInArray(p, array)).toBe(true);
        expect(Point.isInArray(q, array)).toBe(true);
        expect(Point.isInArray(r, array)).toBe(false);
    });

});

describe('Functional tests for Tile', () => {

    test('Tile.createPath', () => {
        expect(() => {Tile.createPath(-1,15);}).toThrowError("Invalid point: negative value(s)");
        const path1 = Tile.createPath();
        const path2 = Tile.createPath(17, 22);

        expect(Point.isEqual(path1.pos, {x:0,y:0})).toBe(true);
        expect(Point.isEqual(path2.pos, {x:17,y:22})).toBe(true);
        expect(path1.type).toBe("path");
        expect(path2.type).toBe("path");
        expect(path1.toString()).toBe("=");
        expect(path2.toString()).toBe("=");
    });

    test('Tile.createGround', () => {
        expect(() => {Tile.createGround(-1,15);}).toThrowError("Invalid point: negative value(s)");

        const ground1 = Tile.createGround();
        const ground2 = Tile.createGround(17, 22);

        expect(Point.isEqual(ground1.pos, {x:0,y:0})).toBe(true);
        expect(Point.isEqual(ground2.pos, {x:17,y:22})).toBe(true);
        expect(ground1.type).toBe("ground");
        expect(ground2.type).toBe("ground");
        expect(ground1.toString()).toBe("-");
        expect(ground2.toString()).toBe("-");
    });

    test('Tile.createTower', () => {
        expect(() => {Tile.createTower(-1,15);}).toThrowError("Invalid point: negative value(s)");
        const tower1 = Tile.createTower();
        const tower2 = Tile.createTower(17, 22);

        expect(Point.isEqual(tower1.pos, {x:0,y:0})).toBe(true);
        expect(Point.isEqual(tower2.pos, {x:17,y:22})).toBe(true);
        expect(tower1.type).toBe("tower");
        expect(tower2.type).toBe("tower");
        expect(tower1.toString()).toBe("#");
        expect(tower2.toString()).toBe("#");
    });

    test('Tile.isFree', () => {
        let tile1: Tile.PathTile = Tile.createPath(0, 0);
        expect(Tile.isFree(tile1)).toBe(true);
        tile1 = { ...tile1, free: false};
        expect(Tile.isFree(tile1)).toBe(false);
        const tile2 = Tile.createGround(0, 0);
        expect(Tile.isFree(tile2)).toBe(false);
    });

    test('Tile.setFree', () => {
        let tile1: Tile.PathTile = Tile.createPath(0, 0);
        tile1 = Tile.setFree(tile1, false);
        expect(tile1.free).toBe(false);
        expect(tile1.toString()).toBe('|');
        tile1 = Tile.setFree(tile1, true);
        expect(tile1.toString()).toBe('=');
    });

});

describe('Functional tests for World', () => {

    test('World.init 1x1', () => {
        const world = World.init(1, [], []);
        expect(world.points.length).toBe(1);
        expect(world.points[0].length).toBe(1);
        expect(Point.isEqual(world.points[0][0].pos, {x:0,y:0})).toBe(true);
        expect(world.points[0][0].toString()).toBe("-");
    });

    test('World.init negative size', () => {
        expect(() => {World.init(-3, [], []);}).toThrow("World size < 0");
    });

    test('World.init size > 1', () => {
        const world = World.init(5, [], []);
        expect(world.points.length).toBe(5);
        for (let i = 0; i < world.points.length; i++) {
            expect(world.points[i].length).toBe(5);
            for (let j = 0; j < world.points.length;j++)
                expect(Point.isEqual(world.points[i][j].pos, {x:j, y:i})).toBe(true);
        }
    });

    test('World.init with path', () => {
        const world = World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []);
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.isFree(world.points[0][0])).toBe(true);
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.isFree(world.points[4][2])).toBe(true);
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.isFree(world.points[4][3])).toBe(true);
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.isFree(world.points[3][1])).toBe(true);
    });

    test('World.isFree', () => {
        const world = World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], [{x:1, y:1}]);
        expect(World.isFree(Point.create(0, 0), world)).toBe(true);
        expect(World.isFree(Point.create(0, 1), world)).toBe(false);
        expect(World.isFree(Point.create(1, 1), world)).toBe(false);
    });

    test('World.setFree', () => {
        let world = World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []);
        world = World.setFree(Point.create(0, 0), false, world);
        expect((world.points[0][0] as Tile.PathTile).free).toBe(false);
        world = World.setFree(Point.create(0, 0), true, world);
        expect((world.points[0][0] as Tile.PathTile).free).toBe(true);
    });

});

describe('Functional tests for Actor', () => {

    test('Actor.askForMove', () => {
        const pathhh : Array<Point.Point> = [{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];
        const world: World.World = World.init(25, pathhh, []);
        const enemy: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
            path: pathhh,
            health: 10,
            initialHealth: 10,
            // speed: 1,
            actions: {
                move: Actor.askForMove
            }};
        expect(enemy.actions.move(enemy, world));
    });

    test('Actor.isEnemy', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
            actions: {},
        };
        expect(Actor.isEnemy(actor1)).toBe(true);
        const tower1: Actor.Actor = {
            type: Actor.ActorType.Tower,
            position: Actor.startPosition,
            actions: {},
        };
        expect(Actor.isEnemy(tower1)).toBe(false);
    });

    test('Actor.asEnemy', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
            actions: {},
        };
        expect(Actor.asEnemy(actor1)).toBe(actor1 as Actor.Enemy);
    });

    test('Actor.isTower', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Tower,
            position: Actor.startPosition,
            actions: {},
        };
        expect(Actor.isTower(actor1)).toBe(true);
        const enemy1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
            actions: {},
        };
        expect(Actor.isTower(enemy1)).toBe(false);
    });

    test('Actor.asTower', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Tower,
            position: Actor.startPosition,
            actions: {},
        } as Actor.Actor;
        expect(Actor.asTower(actor1)).toBe(actor1 as Actor.Tower);
    });

    test('Actor.moveEnemy', () => {
        let actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [{x:2, y:2}],
        } as Actor.Actor;
        expect(actor1.position.x).toBe(1);
        expect(actor1.position.y).toBe(1);
        actor1 = Actor.moveEnemy(actor1 as Actor.Enemy) as Actor.Actor;
        expect(actor1.position.x).toBe(2);
        expect(actor1.position.y).toBe(2);
    });

    test('Actor.endPath', () => {
        let actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [{x:2, y:2}],
        } as Actor.Actor;
        expect(Actor.endPath(actor1 as Actor.Enemy)).toBe(false);
        actor1 = Actor.moveEnemy(actor1 as Actor.Enemy) as Actor.Actor;
        expect(Actor.endPath(actor1 as Actor.Enemy)).toBe(true);
    });

    test('Actor.init', () => {
        const actors = Actor.init(15);
        let i = 0;
        for (i; i < Path.arrayTower.length; i++) {
            expect(actors[i].type).toBe("tower");
            expect(Point.isEqual(actors[i].position, Path.arrayTower[i])).toBe(true);
        }
        for (i; i < actors.length; i++) {
            expect(actors[i].type).toBe("enemy");
            expect(Point.isEqual(actors[i].position, Actor.startPosition)).toBe(true);
        }
    });

    test('Get Actor Type',()=>{
        const LuxelH : Actor.Actor = {
            type : Actor.ActorType.Enemy,
            position : {x:49,y:3},
            actions: {}
        };
        const pasLuxelH: Actor.Actor = {
            type: Actor.ActorType.Tower,
            position: {x: 0, y: 0},
            actions: {}
        };
        expect(Actor.getActorType(LuxelH)).toBe(LuxelH as Actor.Enemy);
        expect(Actor.getActorType(pasLuxelH)).toBe(pasLuxelH as Actor.Tower);
    });

    test('Reachable', ()=>{
        const pathhh : Array<Point.Point> = [{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];
        const B : Tile.Tile = {
            type : Tile.TileType.Tower,
            pos : {x:0,y:0},
            toString: ()=> "#"
        };
        const reach : Array<Point.Point> = Actor.reachable(pathhh,B.pos,4);
        expect(Point.isEqual(reach[0], { x: 1, y: 1 })).toBe(true);
        expect(Point.isEqual(reach[1], { x: 1, y: 2 })).toBe(true);
        expect(Point.isEqual(reach[2], { x: 1, y: 3 })).toBe(true);
    });

    test('is there anybody ?', ()=>{
        const pathhh : Array<Point.Point> = [{x:1,y:1}, {x:1,y:2}, {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];
        const B : Tile.Tile = {
            type : Tile.TileType.Tower,
            pos : {x:2,y:2},
            toString: ()=> "#"
        };
        const world : World.World = World.init(8,pathhh,[B.pos]);
        World.setFree({x:3, y:3}, false, world);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: 3, y: 3 })).toBe(true);
        World.setFree({x:1, y:1}, false, world);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: 3, y: 3 })).toBe(true);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: 1, y: 1 })).toBe(false);
        World.setFree({x:3, y:3}, true, world);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: 1, y: 1 })).toBe(true);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: 3, y: 3 })).toBe(false);
        World.setFree({x:1, y:1}, true, world);
        expect(Point.isEqual(Actor.isthereanybody(pathhh, world), { x: -1, y: -1 })).toBe(true);
    });

    test('tiiir', ()=>{
        const pathhh : Array<Point.Point> = [{x:1,y:1}, {x:1,y:2}, {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];
        const Tow : Actor.Tower = {
            type : Actor.ActorType.Tower,
            position : {x:0,y:1},
            damage : 2,
            range : 2,
            shootable : [],
            actions : { attack: Actor.tiiir }
        };
        const tower = {...Tow, shootable: Actor.reachable(pathhh, Tow.position, Tow.range)};
        const world : World.World = World.init(8,pathhh,[Tow.position]);
        World.setFree({x:1, y:1}, false, world);
        expect(Point.isEqual(Actor.tiiir(tower,world),{ x: 1, y: 1 })).toBe(true);
    });

    test('removeHealth', () => {
        const enemy: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [{x:2, y:2}],
            health: 10,
            initialHealth: 10,
        };
        const newEnemy: Actor.Enemy = Actor.removeHealth(enemy, 2);
        expect(newEnemy.health).toBe(8);
        const testEnemy: Actor.Enemy = Actor.removeHealth(newEnemy, 8);
        expect(testEnemy.health).toBe(0);
    });

    test('newActors', () => {
        const enemy1: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const enemy2: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:2, y:2},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const enemy3: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:3},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const actors: Array<Actor.Actor> = [enemy1, enemy2, enemy3];
        const newActors1: Array<Actor.Actor> = Actor.newActors({...enemy2, position: {x:10, y:10}}, actors, 1);
        const newActors2: Array<Actor.Actor> = Actor.newActors({...enemy1, position: {x:10, y:10}}, actors, 0);
        const newActors3: Array<Actor.Actor> = Actor.newActors({...enemy3, position: {x:10, y:10}}, actors, 2);
        expect(Point.isEqual(newActors1[1].position, {x: 10, y: 10})).toBe(true);
        expect(Point.isEqual(newActors2[0].position, {x: 10, y: 10})).toBe(true);
        expect(Point.isEqual(newActors3[2].position, {x: 10, y: 10})).toBe(true);
    });

    test('getIdx', () => {
        const enemy1: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const enemy2: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:2, y:2},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const enemy3: Actor.Enemy = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:3},
            actions: {},
            path: [],
            health: 10,
            initialHealth: 10,
        };
        const actors: Array<Actor.Actor> = [enemy1, enemy2, enemy3];
        expect(Actor.getIdx(actors, {x:1, y:1}, 0)).toBe(0);
        expect(Actor.getIdx(actors, {x:2, y:2}, 0)).toBe(1);
        expect(Actor.getIdx(actors, {x:3, y:3}, 0)).toBe(2);
    });
});

describe('Functional tests for Path', () => {

    test('removePathHead test', () => {
        const path: Array<Point.Point> = [{x: 0, y: 0}, {x: 1, y: 3}];
        const newPath: Array<Point.Point> = Path.removePathHead(path); 
        expect(newPath.length).toBe(1);
        expect(Point.isEqual(newPath[0], {x: 1, y: 3})).toBe(true);
    });

    test('getPathHead test', () => {
        const path: Array<Point.Point> = [{x: 0, y: 0}, {x: 1, y: 3}];
        expect(Point.isEqual(Path.getPathHead(path), {x: 0, y: 0})).toBe(true);
    });
});

describe('Functional tests for Game', () => {

    test('Game.init', () => {
        const gameState: Game.GameState = Game.init(15);
        expect(gameState.path).toBe(Path.totalPath);
        expect(gameState.round).toBe(1);
        expect(gameState.end).toBe(false);
    });

    test('nextRound test', () => {
        const gameState: Game.GameState = Game.init(15);
        expect(Game.nextRound(gameState).round).toBe(2);
        expect(Game.nextRound(Game.nextRound(gameState)).round).toBe(3);
    });

    test('setFreeMove test', () => {
        const gameState: Game.GameState = Game.init(15);
        const newWorld: World.World = Game.setFreeMove(Actor.startPosition, {x: 2, y: 2}, gameState.world);
        expect(World.isFree({x: 2, y: 2}, newWorld)).toBe(false);
        const testWorld: World.World = Game.setFreeMove({x: 2, y: 2}, {x: 7, y: 9}, newWorld);
        expect(World.isFree({x: 2, y: 2}, newWorld)).toBe(true);
        expect(World.isFree({x: 7, y: 9}, newWorld)).toBe(false);
    });

    test('resolveMove test', () => {
        const enemy1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:0, y:0},
            actions: {},
            path: [{x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            health: 40,
        } as Actor.Actor;
        const enemy2: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [{x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            health: 40,
        } as Actor.Actor;
        const enemy3: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:3},
            actions: {},
            path: [{x:3, y:4}, {x:1, y:3}],
            health: 40,
        } as Actor.Actor;

        const gameState: Game.GameState = {
            world: World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []),
            actors: [enemy1, enemy2, enemy3],
            path: [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            round: 0,
            end: false,
        };

        const proposals1: Array<Point.Point> = [Actor.askForMove(Actor.getActorType(gameState.actors[0]), gameState.world), Actor.askForMove(Actor.getActorType(gameState.actors[1]), gameState.world), Actor.askForMove(Actor.getActorType(gameState.actors[2]), gameState.world)];
        const newGame1: Game.GameState = Game.resolveMove(gameState, proposals1, 0);
        expect(Point.isEqual(newGame1.actors[0].position, {x:2, y:4})).toBe(true);
        expect(newGame1.end).toBe(false);

        const newGame2: Game.GameState = Game.resolveMove(newGame1, proposals1, 1);
        expect(Point.isEqual(newGame2.actors[1].position, {x:1, y:1})).toBe(true);
        expect(newGame2.end).toBe(false);

        const newGame3: Game.GameState = Game.resolveMove(newGame2, proposals1, 2);
        expect(Point.isEqual(newGame3.actors[2].position, {x:3, y:4})).toBe(true);
        expect(newGame3.end).toBe(false);

        const proposals2: Array<Point.Point> = [Actor.askForMove(Actor.getActorType(newGame3.actors[0]), newGame3.world), Actor.askForMove(Actor.getActorType(newGame3.actors[1]), newGame3.world), Actor.askForMove(Actor.getActorType(newGame3.actors[2]), newGame3.world)];
        const newGame4: Game.GameState = Game.resolveMove(newGame3, proposals2, 2);
        expect(Point.isEqual(newGame4.actors[2].position, {x:1, y:3})).toBe(true);
        expect(newGame4.end).toBe(false);

        const proposals3: Array<Point.Point> = [Actor.askForMove(Actor.getActorType(newGame4.actors[0]), newGame4.world), Actor.askForMove(Actor.getActorType(newGame4.actors[1]), newGame4.world), Actor.askForMove(Actor.getActorType(newGame4.actors[2]), newGame4.world)];
        const newGame5: Game.GameState = Game.resolveMove(newGame4, proposals3, 2);
        expect(newGame5.end).toBe(true);
    });

    test('resolveShoot test', () => {
        const enemy1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:0, y:0},
            actions: {},
            path: [{x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            health: 3,
        } as Actor.Actor;
        const enemy2: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:2, y:4},
            actions: {},
            path: [{x:3, y:4}, {x:1, y:3}],
            health: 3,
        } as Actor.Actor;

        const tower1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:3},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:0, y:0}],
        } as Actor.Actor;
        const tower2: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:2},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:2, y:4}],
        } as Actor.Actor;
        const tower3: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:2, y:3},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:0, y:0}, {x:2, y:4}],
        } as Actor.Actor;

        const game: Game.GameState = {
            world: World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []),
            actors: [tower1, tower2, tower3, enemy1, enemy2],
            path: [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            round: 0,
            end: false,
        };

        const gameState: Game.GameState = {...game, world: World.setFree(enemy2.position, false, World.setFree(enemy1.position, false, game.world))};

        const proposals: Array<Point.Point> = [Actor.tiiir(Actor.getActorType(gameState.actors[0]), gameState.world), Actor.tiiir(Actor.getActorType(gameState.actors[1]), gameState.world), Actor.tiiir(Actor.getActorType(gameState.actors[2]), gameState.world)];
        const newGame1: Game.GameState = Game.resolveShoot(gameState, proposals, 0);
        const newEnemies1: Array<Actor.Enemy> = [newGame1.actors[3] as Actor.Enemy, newGame1.actors[4] as Actor.Enemy];
        expect(newEnemies1[0].health).toBe(1);
        expect(newEnemies1[1].health).toBe(3);

        const newGame2: Game.GameState = Game.resolveShoot(newGame1, proposals, 1);
        const newEnemies2: Array<Actor.Enemy> = [newGame2.actors[3] as Actor.Enemy, newGame2.actors[4] as Actor.Enemy];
        expect(newEnemies2[0].health).toBe(1);
        expect(newEnemies2[1].health).toBe(1);

        const newGame3: Game.GameState = Game.resolveShoot(newGame2, proposals, 2);
        const newEnemies3: Array<Actor.Enemy> = [newGame3.actors[3] as Actor.Enemy, newGame3.actors[4] as Actor.Enemy];
        expect(newEnemies3[0].health).toBe(1);
        expect(newEnemies3[1].health).toBe(0);
        expect(Point.isEqual(newEnemies3[1].position, Actor.startPosition)).toBe(true);
        expect(Point.isEqual(newEnemies3[1].path[0], Actor.startPosition)).toBe(true);
        expect(newEnemies3[1].path.length).toBe(1);

        expect(Game.resolveShoot(newGame3, proposals, 2)).toBe(newGame3);
    });

    test('resolveProposals test', () => {
        const enemy1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:0, y:0},
            actions: {},
            path: [{x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            health: 3,
        } as Actor.Actor;
        const enemy2: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            actions: {},
            path: [{x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            health: 3,
        } as Actor.Actor;
        const enemy3: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:3},
            actions: {},
            path: [{x:3, y:4}, {x:1, y:3}],
            health: 3,
        } as Actor.Actor;

        const tower1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:4, y:3},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:1, y:1}],
        } as Actor.Actor;
        const tower2: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:3, y:2},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:2, y:4}],
        } as Actor.Actor;
        const tower3: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:2, y:3},
            actions: {},
            damage: 2,
            range: 2,
            shootable: [{x:1, y:1}, {x:2, y:4}],
        } as Actor.Actor;

        const gameState: Game.GameState = {
            world: World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []),
            actors: [enemy1, enemy2, enemy3, tower1, tower2, tower3],
            path: [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}],
            round: 0,
            end: false,
        };

        const proposalsM: Array<Point.Point> = [Actor.askForMove(Actor.getActorType(gameState.actors[0]), gameState.world), Actor.askForMove(Actor.getActorType(gameState.actors[1]), gameState.world), Actor.askForMove(Actor.getActorType(gameState.actors[2]), gameState.world), Actor.startPosition, Actor.startPosition, Actor.startPosition];

        const newGame1: Game.GameState = Game.resolveProposals(gameState, proposalsM, Game.resolveMove, 0);

        expect(Point.isEqual(newGame1.actors[0].position, {x: 2, y: 4})).toBe(true);
        expect(Point.isEqual(newGame1.actors[1].position, {x: 1, y: 1})).toBe(true);
        expect(Point.isEqual(newGame1.actors[2].position, {x: 3, y: 4})).toBe(true);

        const proposalsA: Array<Point.Point> = [Actor.startPosition, Actor.startPosition, Actor.startPosition, Actor.tiiir(Actor.getActorType(newGame1.actors[3]), newGame1.world), Actor.tiiir(Actor.getActorType(newGame1.actors[4]), newGame1.world), Actor.tiiir(Actor.getActorType(newGame1.actors[5]), newGame1.world)];
        
        const newGame2: Game.GameState = Game.resolveProposals(newGame1, proposalsA, Game.resolveShoot, 0);

        const newEnemies: Array<Actor.Enemy> = [newGame2.actors[0] as Actor.Enemy, newGame2.actors[1] as Actor.Enemy, newGame2.actors[2] as Actor.Enemy];

        expect(newEnemies[0].health).toBe(0); // shooted by 2 towers
        expect(newEnemies[1].health).toBe(1); // shooted by 1 tower
        expect(newEnemies[2].health).toBe(3); // shooted by 0 tower
    });
});

describe('Functional tests for Phase', () => {

    test('computePhases test', () => {
    const gameState: Game.GameState = Game.init(15);
    const phases: Array<Phase.Phase> = Phase.computePhases(gameState);
    expect(phases[0].name).toBe("move");
    expect(phases[1].name).toBe("attack");
    expect(phases[0].resolve).toBe(Game.resolveMove);
    expect(phases[1].resolve).toBe(Game.resolveShoot);
    });
});


// describe('Functional tests for Motor', () => {

//     test('Initial test', () => {
//     const A : Tile.Tile = {
//         pos : {x:2,y:4},
//         toString:  ()=> "."
//     };
//     const B : Tile.Tile = {
//         pos : {x:0,y:0},
//         toString: ()=> "#"
//     };
//     const LuxelH : Actor.Actor = {
//         position : {x:49,y:3},
//         type : 'enemy'
//     };

//         const pathhh : Array<Point.Point> = [{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];
//         const world : World.World = World.init(8,pathhh,[B.pos]);
//         expect(Actor.towers.type).toBe("tower");
//         expect(Actor.distance_manhattan(4,A.pos,B.pos)).toBe(false);
//         const vide :Array<any> = [];
//         expect(vide.length).toBe(0);
//         //expect(Actor.reachable(path,B.pos,4)).toBe([ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 } ])
//         console.log(Actor.reachable(pathhh,B.pos,4));
//         expect(Actor.getActorType(LuxelH)).toBe(LuxelH);
//         //expect(Actor.kill());

//     });

//     test('World.init with tower', () => {
//         const world = World.init(5, [], [{x:0, y:0}, {x:1, y:4}, {x:4, y:2}, {x:1, y:3}]);
//         expect(world.points[0][0].toString()).toBe("#");
//         expect(Tile.getTileType(world.points[0][0]).type).toBe("tower");
//         expect(world.points[0][0].toString()).toBe("#");
//         expect(Tile.getTileType(world.points[4][1]).type).toBe("tower");
//         expect(world.points[0][0].toString()).toBe("#");
//         expect(Tile.getTileType(world.points[2][4]).type).toBe("tower");
//         expect(world.points[0][0].toString()).toBe("#");
//         expect(Tile.getTileType(world.points[3][1]).type).toBe("tower");
//     });
// });