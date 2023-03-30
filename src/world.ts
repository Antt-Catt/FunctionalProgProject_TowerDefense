import * as Point from "./point.js";

type WorldType = {
    points: Array<Array<Point.PointType>>;
};

function init(size: number): WorldType {
    function innerInit<T>(array: Array<T>, size: number, p: T): Array<T> {
        if (size === 0)
            return array;
        return innerInit([...array, p], size - 1, p);
    }

    const world = innerInit([], size, innerInit([], size, Point.create())).map((row, y) => {
        return row.map((_, x) => {
            return Point.create(x, y);
        });
    });

    return { points: world };
}

export {
    WorldType,
    init,
};
