import * as Point from "./point.js";

type Tile = {
    pos: Point.Point;
    toString: () => string;
};

type PathTile = Tile & {
    type: "path";
}

type GroundTile = Tile & {
    type: "ground";
}

type TowerTile = Tile & {
    type: "tower";
}

function createPath(x: number = 0, y: number = 0): PathTile {
    return { pos: Point.create(x, y), type: "path" , toString: () => "=" };
}

function createGround(x: number = 0, y: number = 0): GroundTile {
    return { pos: Point.create(x, y), type: "ground", toString: () => "-" };
}

function createTower(x: number = 0, y: number = 0): TowerTile {
    return { pos: Point.create(x, y), type: "tower", toString: () => "#" };
}

export {
    Tile,
    createPath,
    createGround,
    createTower
};
