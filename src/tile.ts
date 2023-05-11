import * as Point from "./point.js";

/**
 * Enum that represents the different types of tiles.
 * @readonly
 * @enum {string}
 * @property {string} Path - Tile type for tiles accessible by enemies.
 * @property {string} Ground - Tile type for tiles inaccessible by enemies.
 * @property {string} Tower - Tile type for tiles occupied by towers
 */
enum TileType {
    Path = "path",
    Ground = "ground",
    Tower = "tower"
}

/**
 * Represents a tile on a game map.
 * @typedef {Object} Tile
 * @property {TileType} type - The type of the tile
 * @property {Point.Point} pos - The position of the tile
 * @property {function} toString - Function that returns a string representation of the tile.
 */
type Tile = {
    type: TileType;
    pos: Point.Point;
    toString: () => string;
};

/**
 * Represents a tile accessible by enemies.
 * @typedef {Tile} PathTile
 */
type PathTile = Tile & {
    free: boolean;
};

/**
 * Represents a tile inaccessible by enemies.
 * @typedef {Tile} GroundTile
 */
type GroundTile = Tile;

/**
 * Represents a tile occupied by a tower.
 * @typedef {Tile} TowerTile
 */
type TowerTile = Tile;

/**
 * Creates a new path tile.
 * @param {number} [x=0] - The x-coordinate of the tile. Defaults to 0 if not provided.
 * @param {number} [y=0] - The y-coordinate of the tile. Defaults to 0 if not provided.
 * @throws Will throw an error if either x or y is negative.
 * @returns {PathTile} The new path tile.
 */
function createPath(x: number = 0, y: number = 0): PathTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Path, toString: () => '=', free: true };
}

/**
 * Creates a new ground tile.
 * @param {number} [x=0] - The x-coordinate of the tile. Defaults to 0.
 * @param {number} [y=0] - The y-coordinate of the tile. Defaults to 0.
 * @throws Will throw an error if either x or y is negative.
 * @returns {GroundTile} The new ground tile.
 */
function createGround(x: number = 0, y: number = 0): GroundTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Ground, toString: () => '-' };
}

/**
 * Creates a new tower tile.
 * @param {number} [x=0] - The x-coordinate of the tile. Defaults to 0.
 * @param {number} [y=0] - The y-coordinate of the tile. Defaults to 0.
 * @throws Will throw an error if either x or y is negative.
 * @returns {GroundTile} The new tower tile.
 */
function createTower(x: number = 0, y: number = 0): TowerTile {
    if (x < 0 || y < 0) { throw Error("Invalid point: negative value(s)"); }
    return { pos: Point.create(x, y), type: TileType.Tower, toString: () => '#' };
}

/**
 * Determines whether a given tile is a path tile.
 * @param {Tile} tile - The tile to check.
 * @returns {boolean} Returns true if the tile is a path tile, false otherwise.
 */
function isPathTile(tile: Tile): boolean {
    return (tile.type === TileType.Path);
}

/**
 * Attempts to cast a given tile to a path tile.
 * @param {Tile} tile - The tile to cast.
 * @returns {PathTile} A path tile element.
 */
function asPathTile(tile: Tile): PathTile {
    return tile as PathTile;
}

/**
 * Determines whether a given path tile is free to move on.
 * @param {PathTile} tile - The path tile to check.
 * @returns {boolean} Returns true if the tile is free to move on, false otherwise.
 */
function isFree(tile: Tile): boolean {
    if (!isPathTile(tile))
        return false;
    return (asPathTile(tile).free);
}

/**
 * Sets the "free" property of a path tile and returns a new path tile object.
 * @param {PathTile} tile - The path tile to modify.
 * @param {boolean} free - The new value for the "free" property.
 * @returns {PathTile} A new path tile object with the updated "free" property.
 */
function setFree(tile: PathTile, free: boolean): PathTile {
    return { ...tile, free: free, toString: () => (free ? '=' : '|') };
}

export {
    TileType,
    Tile,
    PathTile,
    createPath,
    createGround,
    createTower,
    isFree,
    setFree,
    Point
};
