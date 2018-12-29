function rangeSeq (start, step) {
    const n = this.counter;
    return (step * n) + start;
}

module.exports = rangeSeq;
