import {Block} from "./Block.mjs";

export class Board {
    width;
    height;
    rows;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rows = [...Array(this.height)]
            .map(() => Array(this.width).fill(null))
    }

    toString() {
        return this.rows.map(row =>
            row.map(block => {
                if (!block) return '.'
                else return block.color
            })).map(row => [...row, '\n'].join('')).join('')
    }


    drop(block) {
        if (this.hasFalling()) throw new Error('already falling')
        this.rows[0][1] = block
    }

    tick() {
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

    hasFalling() {
        let falling = false
        this.rows.forEach(row => row.forEach(block => {
            if (block && block.falling) falling = true
        }))
        return falling
    }
}
