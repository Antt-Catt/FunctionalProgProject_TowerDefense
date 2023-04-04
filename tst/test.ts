import * as Actor from "../src/actor";

describe('Main test suite', () => {

    test('Initial test', () => {
        expect(Actor.towers.type).toBe("tower");
    });
})
