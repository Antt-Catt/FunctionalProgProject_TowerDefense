import * as World from "./world.js"

function displayWorld(world: World.World): string {
    let result: string = "";
    world.points.forEach(row => {
        const rowStr = row.reduce((acc, tile) => {
            return acc + tile.type.disp
        }, '');
        result += `${result}\n${rowStr}`
    });
    return result;
}

export {
    displayWorld,
}