import * as Point from "./point.js"

type PathTile = {
    type: "path";
    disp: "= "
}

type GroundTile = {
    type: "ground";
    disp: "- "
}

type TowerTile = {
    type: "tower";
    disp: "# "
}

type Tile = {
    pos: Point.Point;
    type: PathTile | GroundTile | TowerTile; // faire des types différents et utiliser ""
};

function create(x: number = 0, y: number = 0, tile: PathTile | GroundTile | TowerTile = { type: "ground", disp: "- "}): Tile {
    return { pos: Point.create(x, y), type: tile};
}

export {
    PathTile,
    GroundTile,
    TowerTile,
    Tile,
    create,
};
