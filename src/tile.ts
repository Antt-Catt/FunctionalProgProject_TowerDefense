import * as Point from "./point.js";

enum TileType {
    Path = "path",
    Ground = "ground",
    Tower = "tower"
}

type Tile = {
    type: TileType;
    pos: Point.Point;
    toString: () => string;
};

type PathTile = Tile & {
    free: boolean;
};

type GroundTile = Tile;

type TowerTile = Tile;

function createPath(x: number = 0, y: number = 0): PathTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Path, toString: () => '=', free: true };
}

function createGround(x: number = 0, y: number = 0): GroundTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Ground, toString: () => '-' };
}

function createTower(x: number = 0, y: number = 0): TowerTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Tower, toString: () => '#' };
}

// function getTileType(tile: Tile): PathTile | GroundTile | TowerTile {
//     if (tile.toString() === "=")
//         return tile as PathTile;
//     if (tile.toString() === "-")
//         return tile as GroundTile;
//     return tile as TowerTile;
// }

function isPathTile(tile: Tile): boolean {
    return (tile.type === TileType.Path);
}

function asPathTile(tile: Tile): PathTile {
    return tile as PathTile;
}

function isFree(tile: Tile): boolean {
    if (!isPathTile(tile))
        return false;
    return (asPathTile(tile).free);
}

function setFree(tile: PathTile, free: boolean): PathTile {
    return { ...tile, free: free, toString: () => (free ? '=' : '|') };
}

export {
    Tile,
    PathTile,
    createPath,
    createGround,
    createTower,
    isFree,
    setFree
    // getTileType
};
