import * as World from "./world.js";
import * as GameState from "./game.js";
import * as Actor from "./actor.js";
import * as Tile from "./tile.js";
import * as Point from "./point.js";

/**
 * The time between phases.
 * @type {number}
 * @constant
 */
const timeBetweenPhases: number = 500;

/**
 * True if the code is running with Parcel, false otherwise.
 * @type {boolean}
 * @constant
 */
const runWithParcel = (typeof window !== 'undefined');

/**
 * Creates a deep copy of an object or array.
 * @function
 * @param {any} obj - The object or array to be copied.
 * @returns {any} - Returns a deep copy of the object or array.
 */
const deepCopy = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null)
        return obj;
    if (Array.isArray(obj))
        return obj.map(deepCopy);
    const copy: any = {};
    Object.keys(obj).forEach((key) => { copy[key] = deepCopy(obj[key]); });
    return copy;
};

/**
 * Makes a deep copy of a game state.
 * @function
 * @param {GameState.GameState} GameState - Game state to copy.
 * @returns {GameState} - A deep copy of GameState.
 */
const copyGameState = (gameState: GameState.GameState): GameState.GameState => {
    return {
        world: deepCopy(gameState.world),
        actors: deepCopy(gameState.actors),
        path: deepCopy(gameState.path),
        round: gameState.round,
        end: gameState.end,
    };
};

/**
 * Array that stores all the game states.
 * @type {Array<GameState.GameState>}
 * @constant
 */
const gameStateList: Array<GameState.GameState> = [];

/**
 * Adds current game state in game state list.
 * @function
 * @param {GameState.GameState} GameState - Current game state.
 */
const update = (gameState: GameState.GameState) => {
    gameStateList.push(copyGameState(gameState));
};

/**
 * Displays a message on the correct output stream.
 * @function
 * @param {string} message - Message to display.
 */
function displayInfos(message: string) {
    const displayNode = (message: string) => { console.log(`[-] ${message}`); };
    const displayParcel = (message: string) => { (document.getElementById("game_text") as HTMLElement).innerHTML = `${message}`; };
    runWithParcel ? displayParcel(message) : displayNode(message);
}

/**
 * Initializes the display.
 * @function
 * @param {GameState.GameState} gameState - Initial game state.
 */
function initDisplay(gameState: GameState.GameState) {
    function displayParcel(gameState: GameState.GameState) {
        const table: HTMLElement = document.querySelector("table") as HTMLElement;
        for (let i = 0; i < gameState.world.points.length; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < gameState.world.points[0].length; j++) {
                const cell: HTMLElement = document.createElement("td") as HTMLElement;
                cell.classList.add("case");
                row.appendChild(cell);
                const life_div: HTMLElement = document.createElement("div") as HTMLElement;
                life_div.classList.add("life_div");
                cell.appendChild(life_div);
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

    gameStateList.push(copyGameState(gameState));
    displayInfos(`Game Started.`);
    if (runWithParcel)
        displayParcel(gameState);
}

/**
 * Displays the world on the correct output stream.
 * @function
 * @param {GameState.GameState} gameState - Game state to display.
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
                const element: HTMLElement = (document.getElementsByClassName("case")[row_index * 15 + item_index] as HTMLElement);
                if ((item.type === Tile.TileType.Path && !Tile.isFree(item)) !== (element.classList.contains("flower")))
                    element.classList.toggle("flower");
                (document.getElementsByClassName("life_div")[row_index * 15 + item_index] as HTMLElement).style.width = "0%";
            }, '');
        });
        gameState.actors.forEach((actor, _) => {
            if (Actor.isEnemy(actor) && !Point.isEqual(actor.position, Actor.startPosition)) {
                const elt: HTMLElement = (document.getElementsByClassName("life_div")[actor.position.y * 15 + actor.position.x] as HTMLElement);
                const enemy: Actor.Enemy = Actor.asEnemy(actor);
                elt.style.width = `${100 - enemy.health * 100 / enemy.initialHealth}%`;
            }
        });
    }

    runWithParcel ? displayParcel(gameState) : displayNode(gameState.world);
}

/**
 * Displays the end message
 * @function
 * @param {GameState.GameState} gameState - The last game state.
 * @param {number} maxRound - The maximum number of turns.
 */
function displayEnd(gameState: GameState.GameState, maxRound: number) {
    if (gameState.end)
        displayInfos(`Game lost, an enemy has reached the end of the course !`);
    else if (gameState.round >= maxRound)
        displayInfos(`Maximum number of rounds reached !`);
    else
        displayInfos(`Win !`);
}

/**
 * Displays all game states
 * @function
 * @param {GameState.GameState} gameState - The last game state.
 * @param {Array<string>} phases - The name of the phases of the game.
 * @param {number} maxRound - The maximum number of turns.
 */
function displayAll(lastGameState: GameState.GameState, phases: Array<string>, maxRound: number) {
    function displayNode() {
        gameStateList.forEach((gameState, index) => {
            if (index !== 0)
                displayInfos(`Turn ${gameState.round - 1} - Phase ${phases[(index + 1) % phases.length]}.`);
            displayWorld(gameState);
        });
        displayEnd(lastGameState, maxRound);
    }

    function displayParcel() {
        gameStateList.forEach((gameState, index) => {
            setTimeout(() => {
                if (index !== 0)
                    displayInfos(`Turn ${gameState.round - 1} - Phase ${phases[(index + 1) % phases.length]}.`);
                displayWorld(gameState);
                if (index === gameStateList.length - 1)
                    displayEnd(lastGameState, maxRound);
            }, index * timeBetweenPhases);
        });
    }

    runWithParcel ? displayParcel() : displayNode();
}

export {
    initDisplay,
    update,
    displayAll
};