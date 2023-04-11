type Point = {
    x: number;
    y: number;
};

function create(x: number = 0, y: number = 0): Point {
    return { x: x, y: y };
}

function isEqual(p: Point, q: Point) {
    return (p.x === q.x && p.y === q.y);
}

function isInArray(point: Point, array: Array<Point>): boolean {
    return array.some(p => isEqual(p, point));
}

export {
    Point,
    create,
    isEqual,
    isInArray
};
