import * as Tile from "./tile.js";
import { Point } from "./tile.js";

type World = {
    points: Array<Array<Tile.Tile>>;
};

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): World {
    if (size < 0) { throw Error("World size < 0"); }

    function innerInit<T>(array: Array<T>, size: number, p: T): Array<T> {
        if (size === 0)
            return array;
        return innerInit([...array, p], size - 1, p);
    }

    const world = innerInit([], size, innerInit([], size, Tile.createGround())).map((row, y) => {
        return row.map((_, x) => {
            if (Point.isInArray(Point.create(x, y), path)) { return Tile.createPath(x, y); }
            else if (Point.isInArray(Point.create(x, y), towers)) { return Tile.createTower(x, y); }
            return Tile.createGround(x, y);
        });
    });

    return { points: world };
}

function isFree(point: Point.Point, world: World): boolean {
    return Tile.isFree(world.points[point.y][point.x]);
}

function setTileFree(points: Array<Array<Tile.Tile>>, point: Point.Point, free: boolean): Array<Array<Tile.Tile>> {
    points[point.y][point.x] = Tile.setFree(points[point.y][point.x] as Tile.PathTile, free);
    return points;
}

function setFree(point: Point.Point, free: boolean, world: World): World {
    return { ...world, points: setTileFree(world.points, point, free) };
}

export {
    World,
    init,
    isFree,
    setFree,
    Point,
    Tile
};
