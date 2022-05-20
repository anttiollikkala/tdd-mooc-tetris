import {expect} from "chai";
import {ScoringSystem} from "../src/ScoringSystem.mjs";


describe("Scoring system", () => {
    let scoringSystem;
    beforeEach(() => {
        scoringSystem = new ScoringSystem()
    });

    it("when on level 0, single line increments score by 40", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 0
        scoringSystem.increment(1)
        expect(scoringSystem.score).to.equal(beforePoints+40)
    });

    it("when on level 0, two lines increments score by 100", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 0
        scoringSystem.increment(2)
        expect(scoringSystem.score).to.equal(beforePoints+100)
    });

    it("when on level 0, three lines increments score by 300", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 0
        scoringSystem.increment(3)
        expect(scoringSystem.score).to.equal(beforePoints+300)
    });

    it("when on level 0, four lines increments score by 1200", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 0
        scoringSystem.increment(4)
        expect(scoringSystem.score).to.equal(beforePoints+1200)
    });


    it("when on level 1, single line increments score by 80", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 1
        scoringSystem.increment(1)
        expect(scoringSystem.score).to.equal(beforePoints+80)
    });

    it("when on level 1, two lines increments score by 200", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 1
        scoringSystem.increment(2)
        expect(scoringSystem.score).to.equal(beforePoints+200)
    });

    it("when on level 9, three lines increments score by 3000", () => {
        const beforePoints = scoringSystem.score
        scoringSystem.level = 9
        scoringSystem.increment(3)
        expect(scoringSystem.score).to.equal(beforePoints+3000)
    });

});

