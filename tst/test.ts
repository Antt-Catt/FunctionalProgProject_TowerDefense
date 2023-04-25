import * as Actor from "../src/actor.js";
import * as Point  from "../src/point.js";
import * as Tile from "../src/tile.js";
import * as World from "../src/world.js";

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

describe('Functional tests for World', () => {

    test('Actor.isEnemy', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
        } as Actor.Actor
        expect(Actor.isEnemy(actor1)).toBe(true);
        const tower1: Actor.Actor = {
            type: Actor.ActorType.Tower,
            position: Actor.startPosition,
        } as Actor.Actor
        expect(Actor.isEnemy(tower1)).toBe(false);
    });

    test('Actor.asEnemy', () => {
        const actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: Actor.startPosition,
        } as Actor.Actor
        expect(Actor.asEnemy(actor1)).toBe(actor1 as Actor.Enemy);
    });

    test('Actor.moveEnemy', () => {
        let actor1: Actor.Actor = {
            type: Actor.ActorType.Enemy,
            position: {x:1, y:1},
            path: [{x:2, y:2}]
        } as Actor.Actor
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
            path: [{x:2, y:2}]
        } as Actor.Actor
        expect(Actor.endPath(actor1 as Actor.Enemy)).toBe(false);
        actor1 = Actor.moveEnemy(actor1 as Actor.Enemy) as Actor.Actor;
        expect(Actor.endPath(actor1 as Actor.Enemy)).toBe(true);
    });

    test('Actor.init', () => {
        const actors = Actor.init(2, [{ x: 0, y: 0 }, { x: 1, y: 0 }], [{ x: 1, y: 1 }]);
    });
    test('Get Actor Type',()=>{
        const LuxelH : Actor.Actor = {
            type : Actor.ActorType.Enemy,
            position : {x:49,y:3},
      
        };
        expect(Actor.getActorType(LuxelH)).toBe(LuxelH as Actor.Enemy);

    });
    test('Reachable', ()=>{
        const pathhh : Array<Point.Point> = [{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];   
        const B : Tile.Tile = {
            type : Tile.TileType.Tower,
            pos : {x:0,y:0},
            toString: ()=> "#"

    };
    expect(Actor.reachable(pathhh,B.pos,4)).toBe( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 } ]);
    });
    test('is there anybody ?', ()=>{
        const pathhh : Array<Point.Point> = [{x:1,y:1}, {x:1,y:2}, {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];     
        const B : Tile.Tile = {
            type : Tile.TileType.Tower,
            pos : {x:0,y:0},
            toString: ()=> "#"

    };
    const world : World.World = World.init(8,pathhh,[B.pos]);
    expect(Point.isEqual(Actor.isthereanybody(Actor.reachable(pathhh,B.pos,4),world),{ x: 1, y: 3 })).toBe(true);
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