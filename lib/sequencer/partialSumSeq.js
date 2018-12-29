function partialSumSeq (...args) {
    args.length = this.counter + 1;
    return args.reduce((a, b) => a + b, 0);
}

module.exports = partialSumSeq;
