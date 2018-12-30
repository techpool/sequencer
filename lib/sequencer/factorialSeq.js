function factorialSeq () {
    let counter = 0;
    let currentValue = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        let temp;
        if (counter === 0 || counter === 1) {
            temp = 1;
        } else {
            temp = counter * currentValue;
        }

        currentValue = temp;
        counter++;

        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

module.exports = factorialSeq;
