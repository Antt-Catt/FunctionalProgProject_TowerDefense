import * as World from "./world.js";

function displayWorld(world: World.World) {
    function displayNode(world: World.World) {
        let result: string = "";
        world.points.forEach(row => {
            result += `\n${row.reduce((acc, tile) => { return acc + tile.toString() + ' '; }, '')}`;
        });
        console.log(`${result}\n`);
    }

    function displayParcel(world: World.World) {
        world.points.forEach((row, row_index) => {
            row.forEach((item, item_index) => {
                (document.getElementsByClassName("case")[row_index*5+item_index] as HTMLElement).style.backgroundColor = (item.type === "path") ? "gray" : "green";
            }, '');
        });
    }

    return (typeof window !== 'undefined') ? displayParcel(world) : displayNode(world);
}

export {
    displayWorld,
};