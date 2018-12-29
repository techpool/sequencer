function factorialSeq () {
    if (this.counter === 0 || this.counter === 1) {
        return 1;
    }

    return this.counter * this.currentValue;
}

module.exports = factorialSeq;
