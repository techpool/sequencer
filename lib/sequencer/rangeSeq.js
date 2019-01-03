function rangeSeq (start, step) {
    let counter = 0;

    return () => {
        const currentValue = (step * counter++) + start;
        return currentValue;
    };
}

module.exports = rangeSeq;
