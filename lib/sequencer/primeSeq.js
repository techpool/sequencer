function primeSeq () {
    let counter = 0;
    let currentValue = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        let temp;
        if (counter === 0) {
            temp = 2;
        } else {
            let number = currentValue + 1;
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
            temp = number;
        }

        counter++;
        currentValue = temp;

        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

module.exports = primeSeq;
