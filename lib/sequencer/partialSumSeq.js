function partialSumSeq (...args) {
    let counter = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        if (args.length === counter) {
            throw new Error('Out of sequence');
        }

        const currentValue = args.reduce((a, b, c) => {
            if (c > counter) {
                return a;
            }
            return Number(a) + Number(b);
        }, 0);

        counter++;
        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

module.exports = partialSumSeq;
