export class RotatingShape {
    shape
    constructor(shape) {
        this.shape = shape
            .split("\n")
            .map(row => row.trim()
                .split(''))
    }

    toString() {
        return this.shape.map(r => r.join('')).join('\n') + '\n'
    }


    rotateRight() {
        const newRotatingShape = new RotatingShape("")
        newRotatingShape.shape = this.shape.map((r,i) => r.map((c,j) => {
            return this.shape[(this.shape.length - 1) - j][i]
        }))
        return newRotatingShape
    }

    rotateLeft() {
        const newRotatingShape = new RotatingShape("")
        newRotatingShape.shape = this.shape.map((r,i) => r.map((c,j) => {
            return this.shape[j][(this.shape.length - 1) - i]
        }))
        return newRotatingShape
    }

}
