import {expect} from "chai";
import {Board} from "../src/Board.mjs";
import {Tetromino} from "../src/Tetromino.mjs";
import {Block} from "../src/Block.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Line Clear", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    it("line clears when full of blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rows[5] = [
            new Block('T', false),
            new Block('T', false),
            new Block('T', false),
            new Block('T', false),
            null,
            new Block('T', false),
            new Block('T', false),
            new Block('T', false),
            new Block('T', false),
            new Block('T', false),
        ]
        fallToBottom(board)
        board.tick()
        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ..........
       ..........
       ..........
       ...TTT....`
        );
    });

});

