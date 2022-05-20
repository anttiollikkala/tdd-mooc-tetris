import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

function moveBeyondLeftEdge(board) {
    for (let i = 0; i < 10; i++) {
        board.moveLeft();
    }
}


function moveBeyondRightEdge(board) {
    for (let i = 0; i < 10; i++) {
        board.moveRight();
    }
}


describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    it("a falling tetromino can be rotated left", () => {
        board.drop(Tetromino.T_SHAPE);
       const rotated = board.rotateLeft()
        expect(rotated.toString()).to.equalShape(
            `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
        );
    });

    it("a falling tetromino can be rotated right", () => {
        board.drop(Tetromino.T_SHAPE);
        const rotated = board.rotateRight()
        expect(rotated.toString()).to.equalShape(
            `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
        );
    });

    it("it cannot be rotated when there is no room to rotate", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.moveRight()
        board.rotateLeft()
        board.tick()
        board.tick()
        board.tick()
        board.rotateRight()
        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ...T......
       ..TT.T.T..
       ..TTTTTT..
       .TTT.T.T..`
        );
    });

    it("when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
        );
    });
});
