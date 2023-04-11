import * as Actor from "../src/actor.js";
import * as Point  from "../src/point.js";
import * as Tile from "../src/tile.js"
describe('Main test suite', () => {
    
    test('Initial test', () => {
    const A : Tile.Tile = {
        pos : {x:2,y:4},
        type : "ground"
    } 
    const B : Tile.Tile = {
        pos : {x:0,y:0},
        type : "tower"
    } 
    const path : Array<Point.Point> = [{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:3,y:5},{x:2,y:5},{x:1,y:5}];

        expect(Actor.towers.type).toBe("tower");
        expect(Actor.distance_manhattan(4,A.pos,B.pos)).toBe(false);
        expect(Actor.reachable(path,B.pos,4)).toBe([{x:1,y:1},{x:1,y:2},{x:1,y:3}])

    });
})
