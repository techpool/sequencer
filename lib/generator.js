function generator (sequencer, ...args) {
    this.currentValue = 0;
    this.previousValue = 0;
    this.counter = 0;

    let acc;
    if (this.pipe) {
        acc = this.pipe();
    }
    return {
        next: () => {
            const temp = sequencer.apply(this, [...args]);
            this.previousValue = this.currentValue;
            this.currentValue = temp;
            this.counter++;

            if (this.previousValue === this.currentValue) {
                throw new Error('Sequencer out of range');
            }

            if (acc) {
                return acc(this.currentValue);
            } else {
                return this.currentValue;
            }
        }
    };
}

module.exports = generator;
