function factorialSeq () {
    let counter = 0;
    let currentValue = 0;

    return () => {
        let temp;
        if (counter === 0 || counter === 1) {
            temp = 1;
        } else {
            temp = counter * currentValue;
        }

        currentValue = temp;
        counter++;

        return currentValue;
    };
}

module.exports = factorialSeq;
