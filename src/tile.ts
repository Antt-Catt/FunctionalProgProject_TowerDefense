import * as Point from "./point.js"

type Tile = {
    pos: Point.Point;
    type: 'path' | 'ground' | 'tower';
};

type PathTile = Tile & {
    type: 'path';
}

function create(x: number = 0, y: number = 0, type: 'path' | 'ground' | 'tower' = 'ground'): Tile {
    return { pos: Point.create(x, y), type: type };
}

export {
    Tile,
    create,
};
