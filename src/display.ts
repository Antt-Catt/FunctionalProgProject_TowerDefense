import * as World from "./world.js";
import * as GameState from "./game.js";
import * as Actor from "./actor.js";
import * as Tile from "./tile.js";

function initDisplay(gameState: GameState.GameState) {
    if (typeof window !== 'undefined') {
        gameState.world.points.forEach((row, row_index) => {
            row.forEach((item, item_index) => {
                (document.getElementsByClassName("case")[row_index * 5 + item_index] as HTMLElement).classList.add((item.type === Tile.TileType.Path) ? "path" : "ground");
            }, '');
        });
        gameState.actors.forEach((actor, index) => {
            if (Actor.isTower(actor))
                (document.getElementsByClassName("case")[actor.position.x * 5 + actor.position.y] as HTMLElement).classList.add("tower");
        });
    }
}

function displayWorld(gameState: GameState.GameState) {
    function displayNode(world: World.World) {
        let result: string = "";
        world.points.forEach(row => {
            result += `\n${row.reduce((acc, tile) => { return acc + tile.toString() + ' '; }, '')}`;
        });
        console.log(`${result}\n`);
    }

    function displayParcel(gameState: GameState.GameState) {
        const index_list: Array<number> = [];
        gameState.actors.forEach(actor => {
            if (Actor.isEnemy(actor) && (actor.position !== Actor.startPosition))
                index_list.push(Actor.asEnemy(actor).position.y * 5 + Actor.asEnemy(actor).position.x);
        });
        console.log(index_list);
        for (let i = 0; i < gameState.world.points.length*gameState.world.points[0].length; i++) {
            const element: HTMLElement = (document.getElementsByClassName("case")[i] as HTMLElement);
            if ((index_list.includes(i)) !== (element.classList.contains("flower")))
                element.classList.toggle("flower");
        }
    }

    (typeof window !== 'undefined') ? displayParcel(gameState) : displayNode(gameState.world);
}

export {
    initDisplay,
    displayWorld,
};