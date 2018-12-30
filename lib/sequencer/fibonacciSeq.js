function fibonacciSeq () {
    let counter = 0;
    let previousValue = 0;
    let currentValue = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        let temp;
        if (counter < 1) {
            temp = 0;
        } else if (counter <= 2) {
            temp = 1;
        } else {
            temp = previousValue + currentValue;
        }

        previousValue = currentValue;
        currentValue = temp;
        counter++;

        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

module.exports = fibonacciSeq;
