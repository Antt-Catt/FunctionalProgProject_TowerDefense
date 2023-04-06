import * as Tile from "./tile.js";
import * as Point from "./point.js";

type World = {
    points: Array<Array<Tile.Tile>>;
};

function init(size: number, path: Array<Point.Point>, towers: Array<Point.Point>): World {
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

export {
    World,
    init,
};
