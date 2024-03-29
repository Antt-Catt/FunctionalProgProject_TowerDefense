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

/**
 * Removes the first element (head) from an array of Point representing a path
 * @param {Array<Point.Point>} path - An array of Point representing a path
 * @returns {Array<Point.Point>} - A new array of Point with the first element (head) removed
 */
function removePathHead(path: Array<Point.Point>): Array<Point.Point> {
    return path.slice(1);
}

/**
 * Returns the first element (head) from an array of Point objects representing a path
 * @param {Array<Point.Point>} path - An array of Point objects representing a path
 * @returns {Point.Point} - The first element (head) of the path array 
 */
function getPathHead(path: Array<Point.Point>): Point.Point {
    return path[0];
}

export {
    removePathHead,
    getPathHead,
    arrayPath1,
    arrayPath2,
    arrayPathEnd,
    totalPath,
    arrayTower
};