import * as Tile from "./tile.js";

type World = {
    points: Array<Array<Tile.Tile>>;
};

function init(size: number): World {
    function innerInit<T>(array: Array<T>, size: number, p: T): Array<T> {
        if (size === 0)
            return array;
        return innerInit([...array, p], size - 1, p);
    }

    const world = innerInit([], size, innerInit([], size, Tile.create())).map((row, y) => {
        return row.map((_, x) => {
            return Tile.create(x, y);
        });
    });

    return { points: world };
}

export {
    World,
    init,
};
