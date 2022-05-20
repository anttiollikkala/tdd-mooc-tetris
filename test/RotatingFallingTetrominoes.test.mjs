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
        board.tick()
        const rotated = board.rotateLeft()
        expect(rotated.toString()).to.equalShape(
            `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
        );
    });

    it("a falling tetromino can be rotated right", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        const rotated = board.rotateRight()
        expect(rotated.toString()).to.equalShape(
            `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
        );
    });

    it("it cannot be rotated when there is no room to rotate", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `..........
                    ..........
                    T.........
                    TTT.......
                    T.TT......
                    ..T.......
                    `
        );
    });

    it("when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
        );
    });
});
