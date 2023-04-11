import * as Point from "../src/point.js";
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

    test('Tile.getTileType', () => {
        const path = Tile.createPath();
        const path2 = path as Tile.Tile;

        const ground = Tile.createGround();
        const ground2 = ground as Tile.Tile;

        const tower = Tile.createTower();
        const tower2 = tower as Tile.Tile;

        expect(Tile.getTileType(path2).type).toBe("path");        
        expect(Tile.getTileType(ground2).type).toBe("ground");        
        expect(Tile.getTileType(tower2).type).toBe("tower");        
    });
});

describe('Functional tests for World', () => {

    test('World.init 1x1', () => {
        const world = World.init(1, [], []);
        expect(world.points.length).toBe(1);
        expect(world.points[0].length).toBe(1);
        expect(Point.isEqual(world.points[0][0].pos, {x:0,y:0})).toBe(true);
        expect(world.points[0][0].toString()).toBe("-");
        expect(Tile.getTileType(world.points[0][0]).type).toBe("ground");
    });

    test('World.init negative size', () => {
        expect(() => {World.init(-3, [], []);}).toThrow("World size < 0");
    });

    test('World.init size > 1', () => {
        const world = World.init(5, [], []);
        expect(world.points.length).toBe(5);
        for(let i = 0; i < world.points.length; i++) {
            expect(world.points[i].length).toBe(5);
            for(let j = 0; j < world.points.length;j++) {
                expect(Point.isEqual(world.points[i][j].pos, {x:j, y:i})).toBe(true);
            }
        }
    });

    test('World.init with path', () => {
        const world = World.init(5, [{x:0, y:0}, {x:2, y:4}, {x:3, y:4}, {x:1, y:3}], []);
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.getTileType(world.points[0][0]).type).toBe("path");
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.getTileType(world.points[4][2]).type).toBe("path");
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.getTileType(world.points[4][3]).type).toBe("path");
        expect(world.points[0][0].toString()).toBe("=");
        expect(Tile.getTileType(world.points[3][1]).type).toBe("path");
    });

    test('World.init with tower', () => {
        const world = World.init(5, [], [{x:0, y:0}, {x:1, y:4}, {x:4, y:2}, {x:1, y:3}]);
        expect(world.points[0][0].toString()).toBe("#");
        expect(Tile.getTileType(world.points[0][0]).type).toBe("tower");
        expect(world.points[0][0].toString()).toBe("#");
        expect(Tile.getTileType(world.points[4][1]).type).toBe("tower");
        expect(world.points[0][0].toString()).toBe("#");
        expect(Tile.getTileType(world.points[2][4]).type).toBe("tower");
        expect(world.points[0][0].toString()).toBe("#");
        expect(Tile.getTileType(world.points[3][1]).type).toBe("tower");
    });
});