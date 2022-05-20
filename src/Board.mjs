import {Tetromino} from "./Tetromino.mjs";
import {Block} from "./Block.mjs";

export class Board {
    width;
    height;
    rows;
    fallingBlockLocation;
    fallingBlock;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.fallingBlockLocation = {x: 0, y: 0}
        this.rows = [...Array(this.height)]
            .map(() => Array(this.width).fill(null))
    }

    toString() {
        const map = this.rows.map(r => r.slice())
        if (this.fallingBlock) {
            this.fallingBlock.getShape().forEach((r,y) => r.forEach((c,x) => {
                if (c) map[this.fallingBlockLocation.y + y][this.fallingBlockLocation.x + x] = new Block(this.fallingBlock.symbol)
            }))
        }
        return map.map(row =>
            row.map(block => {
                return block ? block.color : '.'
            })).map(row => [...row, '\n'].join('')).join('')
    }


    drop(block) {
        if (this.hasFalling()) throw new Error('already falling')
        if (block instanceof Tetromino) {
            this.fallingBlockLocation = {x: Math.floor((this.width - 4) / 2), y: -1}
            this.fallingBlock = block
        } else {
            this.rows[0][1] = block
        }
    }

    moveLeft() {
        if (!this.collides(this.rows, this.fallingBlock, {x: this.fallingBlockLocation.x-1, y: this.fallingBlockLocation.y})) this.fallingBlockLocation.x--
    }

    moveRight() {
        if (!this.collides(this.rows, this.fallingBlock, {x: this.fallingBlockLocation.x+1, y: this.fallingBlockLocation.y})) this.fallingBlockLocation.x++
    }

    moveDown() {
        this.tick()
    }

    tick() {
        if (this.fallingBlock) {
            if (!this.collides(
                this.rows,
                this.fallingBlock,
                {x: this.fallingBlockLocation.x, y: this.fallingBlockLocation.y + 1})
            ) this.fallingBlockLocation.y++
            else {
                this.fallingBlock.getShape().forEach((r,y) => r.forEach((c,x) => {
                    if (c) this.rows[this.fallingBlockLocation.y + y][x + this.fallingBlockLocation.x] = new Block(this.fallingBlock.symbol, false)
                }))
                this.fallingBlock = null
            }
        } else if (this.hasFalling()) {
            this.rows = this.rows.map((row, i) => row.map((block, j) => {
                if (this.rows[i][j] && i === this.height-1) {
                    this.rows[i][j].falling = false
                    return this.rows[i][j]
                }

                if (this.rows[i][j] && this.rows[i+1][j]) {
                    this.rows[i][j].falling = false
                    return this.rows[i][j]
                }

                if (i === 0 || !this.rows[i-1][j]) return null
                if (this.rows[i-1][j] && !this.rows[i][j]) return this.rows[i-1][j]
                if (this.rows[i-1][j] && this.rows[i][j]) {
                    this.rows[i-1][j].falling = false
                    return this.rows[i][j]
                }
                return block
            }))
        }


    }

    collides(field, block, blockLocation,) {
        if (!block) return false
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (block.getShape()[y][x]) {
                    if (blockLocation.y + y > this.height - 1) return true
                    if (blockLocation.x + x > this.width - 1) return true
                    if (blockLocation.y + y < 0) return true
                    if (blockLocation.x + x > this.width - 1) return true
                    if (blockLocation.x + x < 0) return true
                    if (this.rows[blockLocation.y + y][blockLocation.x + x]) return true
                }
            }
        }

        return false;
    }

    rotateRight() {
        if (!this.collides(
                this.rows, this.fallingBlock.rotateRight(), this.fallingBlockLocation )) {
            this.fallingBlock = this.fallingBlock.rotateRight()
            return this
        }
        for (let i = 1; i < 5; i++) {
            if (!this.collides(
                this.rows, this.fallingBlock.rotateRight(), {...this.fallingBlockLocation, x: this.fallingBlockLocation.x+i}, true )) {
                this.fallingBlockLocation.x++
                this.fallingBlock = this.fallingBlock.rotateRight()
                return this
            }
            if (!this.collides(
                this.rows,this.fallingBlock.rotateRight(), {...this.fallingBlockLocation, x: this.fallingBlockLocation.x-i}, true  )) {
                this.fallingBlockLocation.x--
                this.fallingBlock = this.fallingBlock.rotateRight()
                return this
            }
        }

        return this
    }

    rotateLeft() {
        if (!this.collides(
            this.rows, this.fallingBlock.rotateLeft(), this.fallingBlockLocation, true )) {
            this.fallingBlock = this.fallingBlock.rotateLeft()
            return this
        }
        for (let i = 1; i < 5; i++) {
            if (!this.collides(
                this.rows, this.fallingBlock.rotateLeft(), {...this.fallingBlockLocation, x: this.fallingBlockLocation.x+i}, true  )) {
                this.fallingBlockLocation.x++
                this.fallingBlock = this.fallingBlock.rotateLeft()
                return this
            }

            if (!this.collides(
                this.rows, this.fallingBlock.rotateLeft(), {...this.fallingBlockLocation, x: this.fallingBlockLocation.x-i}, true  )) {
                this.fallingBlockLocation.x--
                this.fallingBlock = this.fallingBlock.rotateLeft()
                return this
            }
        }
        return this
    }


    hasFalling() {
        if (this.fallingBlock) return true
        let falling = false
        this.rows.forEach(row => row.forEach(block => {
            if (block && block.falling) falling = true
        }))
        return falling
    }
}
