export class ScoringSystem {
    level
    score
    constructor() {
        this.level = 0;
        this.score = 0
    }

    increment(lines) {
        const lineMultipliers = [40,100,300,1200]
        this.score += lineMultipliers[lines-1] * (this.level+1)
    }

}