function fibonacciSeq () {
    let counter = 0;
    let previousValue = 0;
    let currentValue = 0;

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

        return currentValue;
    };
}

module.exports = fibonacciSeq;
