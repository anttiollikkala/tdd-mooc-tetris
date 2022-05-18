export class Tetromino {
    shape;
    constructor(stringShape) {
        this.shape = stringShape.split("\n").map(s => s.trim().split(''))
    }

    toString() {
        return this.shape.map(s => s.join('')).join("\n") + "\n"
    }

    rotateRight() {
        const newTetromino = new Tetromino("")
        newTetromino.shape = this.shape.map((r,i) => r.map((c,j) => {
            return this.shape[(this.shape.length - 1) - j][i]
        }))
        return newTetromino
    }

}

Tetromino.T_SHAPE = new Tetromino(`.T.\nTTT\n...`)