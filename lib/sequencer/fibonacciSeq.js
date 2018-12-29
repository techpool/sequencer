function fibonacciSeq () {
    if (this.counter < 1) {
        return 0;
    }

    if (this.counter <= 2) {
        return 1;
    }

    return this.previousValue + this.currentValue;
}

module.exports = fibonacciSeq;
