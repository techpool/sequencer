function primeSeq () {
    let counter = 0;
    let currentValue = 0;

    return () => {
        let temp;
        if (counter === 0) {
            temp = 2;
        } else {
            let number = currentValue + 1;
            while (true) {
                const primeFound = _isPrime(number);
                if (primeFound) {
                    break;
                }
                number++;
            }
            temp = number;
        }

        counter++;
        currentValue = temp;

        return currentValue;
    };
}

function _isPrime (number) {
    if (number % 2 === 0) {
        return false;
    }

    const limit = Math.round(number / 2);
    for (let i = 2; i < limit; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

module.exports = primeSeq;
