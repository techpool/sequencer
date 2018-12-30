function rangeSeq (start, step) {
    let counter = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }
    return () => {
        const currentValue = (step * counter++) + start;
        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

module.exports = rangeSeq;
