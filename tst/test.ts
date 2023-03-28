import * as Actor from "../src/actor";

describe('Main test suite', () => {

    test('Initial test', () => {
        expect(Actor.towers.type).toBe("tower");
        expect(Actor.towers.actions(Actor.towers, Actor.world)).toStrictEqual({i:2,j:4});
        expect(1).toBe(1);
    });

})
