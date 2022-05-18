export class RotatingShape {
    shape
    constructor(shape) {
        this.shape = shape.replace(/[^\S\r\n]+/g, "");;
    }

    toString() {
        return this.shape + "\n"
    }


}
