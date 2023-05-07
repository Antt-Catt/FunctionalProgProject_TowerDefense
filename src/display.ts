import * as World from "./world.js";
import * as GameState from "./game.js";
import * as Actor from "./actor.js";
import * as Tile from "./tile.js";

const runWithParcel = (): boolean => { return (typeof window !== 'undefined'); };

const deepCopy = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null)
        return obj;
    if (Array.isArray(obj))
        return obj.map(deepCopy);
    const copy: any = {};
    Object.keys(obj).forEach((key) => { copy[key] = deepCopy(obj[key]); });
    return copy;
};

const copyGameState = (gameState: GameState.GameState): GameState.GameState => {
    return {
        world: deepCopy(gameState.world),
        actors: deepCopy(gameState.actors),
        path: deepCopy(gameState.path),
        round: gameState.round,
        end: gameState.end,
    };
};

const gameStateList: Array<GameState.GameState> = [];

/**
 * Add current game state in game state list.
 * @param {gameState} GameState.GameState - Current game state.
 * @returns {void}
 */
const update = (gameState: GameState.GameState) => {
    gameStateList.push(copyGameState(gameState));
};

/**
 * Display a message on the correct output stream.
 * @param {string} message - Message to display.
 * @returns {void}
 */
function displayInfos(message: string) {
    const displayNode = (message: string) => { console.log(`[-] ${message}`); };
    const displayParcel = (message: string) => { (document.getElementById("game_text") as HTMLElement).innerHTML = `${message}`; };
    runWithParcel() ? displayParcel(message) : displayNode(message);
}

/**
 * Initialize the display.
 * @param {GameState.GameState} gameState - Initial game state.
 * @returns {void}
 */
function initDisplay(gameState: GameState.GameState) {

    function displayParcel(gameState: GameState.GameState) {
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
                (document.getElementsByClassName("case")[row_index * 5 + item_index] as HTMLElement).classList.add((item.type === Tile.TileType.Path) ? "path" : "ground");
            }, '');
        });
        gameState.actors.forEach((actor, index) => {
            if (Actor.isTower(actor))
                (document.getElementsByClassName("case")[actor.position.x * 5 + actor.position.y] as HTMLElement).classList.add("tower");
        });
    }

    gameStateList.push(copyGameState(gameState));
    displayInfos(`Game Started.`);
    if (runWithParcel())
        displayParcel(gameState);
}

/**
 * Display the world on the correct output stream.
 * @param {GameState.GameState} gameState - Game state to display.
 * @returns {void}
 */
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
                const element: HTMLElement = (document.getElementsByClassName("case")[row_index * 5 + item_index] as HTMLElement);
                if ((item.type === Tile.TileType.Path && !Tile.isFree(item)) !== (element.classList.contains("flower")))
                    element.classList.toggle("flower");
            }, '');
        });
    }

    runWithParcel() ? displayParcel(gameState) : displayNode(gameState.world);
}

/**
 * Display the end message
 * @param {GameState.GameState} gameState - The last game state.
 * @param {number} maxRound - The maximum number of turns.
 * @returns {void}
 */
function displayEnd(gameState: GameState.GameState, maxRound: number) {
    if (gameState.end)
        displayInfos(`Game lost, an enemy has reached the end of the course !`);
    else if (gameState.round > maxRound)
        displayInfos(`Maximum number of rounds reached !`);
    else
        displayInfos(`Win !`);
}

/**
 * Display all game states
 * @param {GameState.GameState} gameState - The last game state.
 * @param {Array<string>} phases - The name of the phases of the game.
 * @param {number} maxRound - The maximum number of turns.
 * @returns {void}
 */
function displayAll(gameState: GameState.GameState, phases: Array<string>, maxRound: number) {
    function displayNode() {
        gameStateList.forEach((gameState, index) => {
            if (index !== 0)
                displayInfos(`Turn ${gameState.round} - Phase ${phases[(index + 1) % phases.length]}.`);
            displayWorld(gameState);
        });
        displayEnd(gameState, maxRound);
    }

    function displayParcel() {
        gameStateList.forEach((gameState, index) => {
            setTimeout(() => {
                if (index === gameStateList.length - 1)
                    displayEnd(gameState, maxRound);
                else {
                    if (index !== 0)
                        displayInfos(`Turn ${gameState.round} - Phase ${phases[(index + 1) % phases.length]}.`);
                    displayWorld(gameState);
                }
            }, index * 500);
        });
    }

    runWithParcel() ? displayParcel() : displayNode();
}

export {
    initDisplay,
    update,
    displayAll
};