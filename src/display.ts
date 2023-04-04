import * as World from "./world.js"

function displayWorld(world: World.World): void {
    world.points.forEach(row => {
        const rowStr = row.reduce((acc, tile) => {
            switch (tile.type) {
                case 'path':
                    return acc + '= ';
                case 'ground':
                    return acc + '- ';
                case 'tower':
                    return acc + '# ';
                default:
                    return acc;
            }
        }, '');
        console.log(rowStr);
    });
}

export {
    displayWorld,
}