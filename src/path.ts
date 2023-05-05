import * as Point from "./point.js";

const arrayPath1: Array<Point.Point> = [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 3 },
    {x: 4, y: 3}, {x: 4, y: 4}, {x: 4, y: 5}, {x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}, {x: 4, y: 9}, {x: 5, y: 9}];

const arrayPath2: Array<Point.Point> = [{x: 0, y: 13}, {x: 1, y: 13}, {x: 2, y: 13}, {x: 2, y: 12}, {x: 3, y: 12}, {x: 3, y: 11}, {x: 4, y: 11}, {x: 5, y: 11}];

const arrayPathEnd: Array<Point.Point> = [{x: 5, y: 10}, {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10}, {x: 9, y: 9},
    {x: 10, y: 9}, {x: 10, y: 8}, {x: 11, y: 8}, {x: 11, y: 7}, {x: 12, y: 7}, {x: 13, y: 7}, {x: 13, y: 8}, {x: 13, y: 9}, {x: 13, y: 10},
    {x: 12, y: 10}, {x: 12, y: 11}, {x: 12, y: 12}, {x: 11, y: 12}, {x: 11, y: 13}, {x: 10, y: 13}, {x: 9, y: 13}, {x: 8, y: 13}, {x: 8, y: 14}];
    
const totalPath: Array<Point.Point> = arrayPath1.concat(arrayPath2, arrayPathEnd);

const arrayTower: Array<Point.Point> = [{ x: 1, y: 1 }, { x: 3, y: 4 }, {x: 5, y: 8},
    {x: 4, y: 10}, {x: 8, y: 12}, {x: 11, y: 9}, {x: 13, y: 13}, {x: 2, y: 14}, {x: 14, y: 7}];

export {
    arrayPath1,
    arrayPath2,
    arrayPathEnd,
    totalPath,
    arrayTower
};