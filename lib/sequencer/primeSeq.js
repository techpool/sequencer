function primeSeq () {
    if (this.counter === 0) {
        return 2;
    }

    let number = this.currentValue + 1;
    while (true) {
        let primeFound = true;

        if (number % 2 === 0) {
            primeFound = false;
        }

        const limit = Math.round(number / 2);
        for (let i = 2; i < limit; i++) {
            if (number % i === 0) {
                primeFound = false;
                break;
            }
        }

        if (primeFound) {
            break;
        }
        number++;
    }

    return number;
}

module.exports = primeSeq;
