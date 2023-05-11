import * as Tile from "./tile.js";
import { Point } from "./tile.js";

/**
 * Represents a two-dimensional world consisting of an array of Tiles.
 * @typedef {Object} World
 * @property {Array<Array<Tile.Tile>>} points - The array of tiles that form the world.
 */
type World = {
    points: Array<Array<Tile.Tile>>;
};

/**
 * Initializes a new World element.
 * @function
 * @param {number} size - The size of the world.
 * @param {Array<Point.Point>} path - The path through the world.
 * @param {Array<Point.Point>} towers - The locations of the towers in the world.
 * @throws {Error} When the size of the world is less than 0.
 * @returns {World} A new World object.
 */
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

/**
 * Determines if a tile at the specified point in the given world is free.
 * @function
 * @param {Point.Point} point - The point to check.
 * @param {World} world - The world to check in.
 * @returns {boolean} True if the tile at the specified point is free, false otherwise.
 */
function isFree(point: Point.Point, world: World): boolean {
    return Tile.isFree(world.points[point.y][point.x]);
}

function setTileFree(points: Array<Array<Tile.Tile>>, point: Point.Point, free: boolean): Array<Array<Tile.Tile>> {
    points[point.y][point.x] = Tile.setFree(points[point.y][point.x] as Tile.PathTile, free);
    return points;
}

/**
 * Sets the specified tile in the world to free or not.
 * @function
 * @param {Point.Point} point - The point representing the tile to modify.
 * @param {boolean} free - True if the tile should be set to free, otherwise false.
 * @param {World} world - The world containing the tile to modify.
 * @returns {World} A new World element with the modified tile.
 */
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
