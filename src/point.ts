type Point = {
    x: number;
    y: number;
};

function create(x: number = 0, y: number = 0): Point {
    return { x: x, y: y };
}

export {
    Point,
    create
}
