import {
    PointType,
    create as pointCreate
} from "./point.js";

type WorldType = {
    points: Array<Array<PointType>>;
};

function init(size: number): WorldType {
    function innerInit<T>(array: Array<T>, size: number, p: T): Array<T> {
        if (size === 0)
            return array;
        return innerInit([...array, p], size - 1, p);
    }

    const world = innerInit([], size, innerInit([], size, pointCreate())).map((row, y) => {
        return row.map((_, x) => {
            return pointCreate(x, y);
        });
    });

    return { points: world };
}

export {
    WorldType,
    init,
};
