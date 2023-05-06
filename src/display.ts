import * as World from "./world.js";
import * as GameState from "./game.js";
import * as Actor from "./actor.js";
import * as Tile from "./tile.js";

const runWithParcel = (): boolean => { return (typeof window !== 'undefined'); };

function initDisplay(gameState: GameState.GameState) {
    function displayNode(gameStage: GameState.GameState) {
        console.log(`\n[-] Initial world.\n`);
    }

    function displayParcel(gameStage: GameState.GameState) {
        const table: HTMLElement = document.querySelector("table") as HTMLElement;
        for (let i = 0; i < gameState.world.points.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < gameState.world.points[0].length; j++) {
                const cell: HTMLElement = document.createElement('td') as HTMLElement;
                cell.classList.add('case');
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        gameState.world.points.forEach((row, row_index) => {
            row.forEach((item, item_index) => {
                (document.getElementsByClassName("case")[row_index * 15 + item_index] as HTMLElement).classList.add((item.type === Tile.TileType.Path) ? "path" : "ground");
            }, '');
        });
        gameState.actors.forEach((actor, index) => {
            if (Actor.isTower(actor))
                (document.getElementsByClassName("case")[actor.position.x + actor.position.y * 15] as HTMLElement).classList.add("tower");
        });
    }

    runWithParcel() ? displayParcel(gameState) : displayNode(gameState);
}

function displayInfos(message: string) {
    const displayNode = (message: string) => { console.log(`[-] ${message}`); };
    const displayParcel = (message: string) => { (document.getElementById("game_text") as HTMLElement).innerHTML = `${message}`; };
    runWithParcel() ? displayParcel(message) : displayNode(message);
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
        gameState.world.points.forEach((row, row_index) => {
            row.forEach((item, item_index) => {
                const element: HTMLElement = (document.getElementsByClassName("case")[row_index * 15 + item_index] as HTMLElement);
                if ((item.type === Tile.TileType.Path && !Tile.isFree(item))  !== (element.classList.contains("flower")))
                    element.classList.toggle("flower");
            }, '');
        });
        displayNode(gameState.world);
    }

    runWithParcel() ? displayParcel(gameState) : displayNode(gameState.world);
}

export {
    initDisplay,
    displayInfos,
    displayWorld,
};