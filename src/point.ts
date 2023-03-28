type PointType = {
    x: number;
    y: number;
};

function create(x: number = 0, y: number = 0): PointType {
    return { x: x, y: y };
}

export {
    PointType,
    create,
};
