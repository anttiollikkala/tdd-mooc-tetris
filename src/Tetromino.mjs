export class Tetromino {
    shape;
    stringShape;
    orientations;
    orientation;

    constructor(stringShape, orientations, orientation = 0) {
        this.stringShape = stringShape
        this.shape = stringShape.split("\n").map(s => s.trim().split(''))
        this.orientations = orientations
        this.orientation = Math.abs((orientation + orientations) % orientations)
    }

    toString() {
        let rotatedShape = this.shape.map(r => r.slice())
        for (let i = 0; i < this.orientation; i++) {
            rotatedShape = rotatedShape.map((r, i) => r.map((c, j) => {
                return rotatedShape[(rotatedShape.length - 1) - j][i]
            }))
        }
        return rotatedShape.map(s => s.join('')).join("\n") + "\n"
    }

    rotateRight() {
        return new Tetromino(this.stringShape, this.orientations, this.orientation + 1)
    }

    rotateLeft() {
        return new Tetromino(this.stringShape, this.orientations, this.orientation - 1)
    }

}

Tetromino.T_SHAPE = new Tetromino(`.T.\nTTT\n...`, 4)

Tetromino.I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`, 2)

Tetromino.O_SHAPE = new Tetromino(`.OO\n.OO\n...`, 1)