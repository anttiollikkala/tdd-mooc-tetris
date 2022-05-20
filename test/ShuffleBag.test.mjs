import {expect } from "chai";
import {ShuffleBag} from "../src/ShuffleBag.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Shuffle bag", () => {
    it("Bag gives correct amount of each items", () => {
        const shuffleBag = new ShuffleBag({T: 2, O: 6, I: 8})
        const counts = {}
        let next
        while (next = shuffleBag.pick()) {
            if (!counts[next]) counts[next] = 0;
            counts[next]++
        }

        expect(counts.T).to.equal(2)
        expect(counts.O).to.equal(6)
        expect(counts.I).to.equal(8)

    });

    it("Bag gives correct amount of each items after one cycle", () => {
        const shuffleBag = new ShuffleBag({T: 2, O: 6, I: 8})
        const counts = {}
        let next

        for (let i = 0; i < 16; i++) shuffleBag.pick()


        while (next = shuffleBag.pick()) {
            if (!counts[next]) counts[next] = 0;
            counts[next]++
        }

        expect(counts.T).to.equal(2)
        expect(counts.O).to.equal(6)
        expect(counts.I).to.equal(8)

    });

});

