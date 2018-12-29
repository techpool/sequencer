function accumulator () {
    let sum = 0;
    return function (value) {
        sum += value;
        return sum;
    };
}

module.exports = accumulator;
