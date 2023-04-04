import * as Tile from "./tile.js";
import * as Point from "./point.js"

type World = {
    points: Array<Array<Tile.Tile>>;
};

function isPointInArrays(point: Point.Point, array: Array<Point.Point>): boolean {
    return array.some(p => p.x === point.x && p.y === point.y);
}

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): World {
    function innerInit<T>(array: Array<T>, size: number, p: T): Array<T> {
        if (size === 0)
            return array;
        return innerInit([...array, p], size - 1, p);
    }

    const world = innerInit([], size, innerInit([], size, Tile.create())).map((row, y) => {
        return row.map((_, x) => {
            if (isPointInArrays(Point.create(x, y), path)) { return Tile.create(x, y, 'path'); }
            if (isPointInArrays(Point.create(x, y), towers)) { return Tile.create(x, y, 'tower'); }
            return Tile.create(x, y, 'ground');
        });
    });

    return { points: world };
}

export {
    World,
    init,
};
