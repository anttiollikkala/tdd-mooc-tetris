import {expect} from "chai";
import {Board} from "../src/Board.mjs";
import {Tetromino} from "../src/Tetromino.mjs";

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

describe("Moving alling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    it("a falling tetromino can be moved left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft()
        expect(board.toString()).to.equalShape(
            `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
        );
    });

    it("a falling tetromino can be moved right", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight()

        expect(board.toString()).to.equalShape(
            `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
        );

    });

    it("a falling tetromino can be moved down", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
        );
    });

    it("it cannot be moved left beyond the board", () => {
        board.drop(Tetromino.T_SHAPE);
        moveBeyondLeftEdge(board)

        expect(board.toString()).to.equalShape(
            `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
        );
    });

    it("it cannot be moved right beyond the board", () => {
        board.drop(Tetromino.T_SHAPE);
        moveBeyondRightEdge(board)

        expect(board.toString()).to.equalShape(
            `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
        );
    });

    it("it cannot be moved down beyond the board (will stop falling)", () => {
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board)
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
        );
    });

    it("it cannot be moved left through other blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateRight()
        board.rotateRight()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateRight()
        board.rotateRight()
        board.moveRight();
        board.moveRight();
        fallToBottom(board)
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();

        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ..........
       ......T...
       ....TTTT..
       ...TTT....`
        );
    });

    it("it cannot be moved right through other blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateRight()
        board.rotateRight()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.rotateRight()
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.moveRight();
        board.moveRight();
        board.moveRight();

        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ..........
       ..T.......
       .TTTT.....
       ...TTT....`
        );
    });

    it("it cannot be moved down through other blocks (will stop falling)", () => {
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board)
        expect(board.hasFalling()).to.be.false;
        expect(board.toString()).to.equalShape(
            `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
        );
    });

});

