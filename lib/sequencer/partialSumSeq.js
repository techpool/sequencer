function partialSumSeq (...args) {
    if (args.length === this.counter) {
        throw new Error('Out of index');
    }

    args.length = this.counter + 1;
    return args.reduce((a, b) => a + b, 0);
}

module.exports = partialSumSeq;
