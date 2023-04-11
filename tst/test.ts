import * as Actor from "../src/actor.js";
import * as Tile from "../src/tile.js";
describe('Main test suite', () => {
    
    test('Initial test', () => {
    const A : Tile.Tile = {
        pos : {x:2,y:4},
        type : "ground"
    };
    const B : Tile.Tile = {
        pos : {x:0,y:0},
        type : "tower"
    };
        expect(Actor.towers.type).toBe("tower");
        expect(Actor.distance_manhattan(4,A,B.pos)).toBe(false);
    });
});
