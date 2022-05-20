export class ShuffleBag {
    items = []
    distributions
    constructor(distributions) {
        this.distributions = distributions
    }

    pick() {
        if (this.items.length === 0) this.generate()
        return this.items.pop()
    }

    generate() {
        const keys = Object.keys(this.distributions)
        keys.forEach(key => {
            for (let i = 0; i < this.distributions[key]; i++) {
                this.items.push(key)
            }
        })
        this.items = this.items.sort(() => Math.random() - 0.5);
    }

}