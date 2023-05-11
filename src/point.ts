/**
 * Represents a point in 2D coordinate space.
 * @typedef {Object} Point
 * @property {number} x - The x-coordinate of the point.
 * @property {number} y - The y-coordinate of the point.
 */
type Point = {
    x: number;
    y: number;
};

/**
 * Creates a new Point element with the specified x and y coordinates.
 * @function
 * @param {number} [x=0] - The x-coordinate of the new Point. Defaults to 0 if not provided.
 * @param {number} [y=0] - The y-coordinate of the new Point. Defaults to 0 if not provided.
 * @returns {Point} A new Point element with the specified coordinates.
 */
function create(x: number = 0, y: number = 0): Point {
    return { x: x, y: y };
}

/**
 * Checks whether two Point elements have equal x and y coordinates.
 * @function
 * @param {Point} p - The first Point element to compare.
 * @param {Point} q - The second Point element to compare.
 * @returns {boolean} True if the two points have equal x and y coordinates, false otherwise.
 */
function isEqual(p: Point, q: Point) {
    return (p.x === q.x && p.y === q.y);
}

/**
 * Checks whether a given Point element is equal to a Point in an array of Point elements.
 * @function
 * @param {Point} point - The Point element to search for in the array.
 * @param {Array<Point>} array - The array of Point elements to search in.
 * @returns {boolean} True if an element equal to point is found in the array, false otherwise.
 */
function isInArray(point: Point, array: Array<Point>): boolean {
    return array.some(p => isEqual(p, point));
}

export {
    Point,
    create,
    isEqual,
    isInArray
};
