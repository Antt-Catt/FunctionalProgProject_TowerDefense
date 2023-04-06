import * as World from "./world.js";
import * as Main from "./main.js";

function displayWorld(world: World.World): string {
    let result: string = "";
    world.points.forEach(row => {
        const rowStr = row.reduce((acc, tile) => { return acc + tile.toString() + ' '; }, '');
        result += `\n${rowStr}`;
    });
    return result;
}

export {
    displayWorld,
};