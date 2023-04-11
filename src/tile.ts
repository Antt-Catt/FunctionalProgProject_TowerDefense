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

function getTileType(tile: Tile): PathTile | GroundTile | TowerTile {
    if (tile.toString() === "=")
        return tile as PathTile;
    if (tile.toString() === "-")
        return tile as GroundTile;
    return tile as TowerTile;
}

function createPath(x: number = 0, y: number = 0): PathTile {
    if (x < 0 || y < 0) {throw Error("Invalid point: negative value(s)");}
    return { pos: Point.create(x, y), type: "path" , toString: () => "=" };
}

function createGround(x: number = 0, y: number = 0): GroundTile {
    if (x < 0 || y < 0) {throw Error("Invalid point: negative value(s)");}
    return { pos: Point.create(x, y), type: "ground", toString: () => "-" };
}

function createTower(x: number = 0, y: number = 0): TowerTile {
    if (x < 0 || y < 0) {throw Error("Invalid point: negative value(s)");}
    return { pos: Point.create(x, y), type: "tower", toString: () => "#" };
}

export {
    Tile,
    createPath,
    createGround,
    createTower,
    getTileType
};
