function fibonacciSeq () {
    if (this.counter < 1) {
        return 0;
    }

    if (this.counter <= 2) {
        return 1;
    }

    return this.previousValue + this.currentValue;
}

function factorialSeq () {
    if (this.counter === 0 || this.counter === 1) {
        return 1;
    }

    return this.counter * this.currentValue;
}

function rangeSeq (start, step) {
    const n = this.counter;
    return (step * n) + start;
}

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

function partialSumSeq (...args) {
    args.length = this.counter + 1;
    return args.reduce((a, b) => a + b, 0);
}

function generator (sequencer, ...args) {
    this.currentValue = 0;
    this.previousValue = 0;
    this.counter = 0;

    let acc;
    if (this.pipe) {
        acc = this.pipe();
    }
    return {
        next: () => {
            const temp = sequencer.apply(this, [...args]);
            this.previousValue = this.currentValue;
            this.currentValue = temp;
            this.counter++;

            if (this.previousValue === this.currentValue) {
                throw new Error('Sequencer out of range');
            }

            if (acc) {
                return acc(this.currentValue);
            } else {
                return this.currentValue;
            }
        }
    };
}

function accumulator () {
    let sum = 0;
    return function (value) {
        sum += value;
        return sum;
    };
}

function isEven () {
    return function (value) {
        if (value % 2 === 0) {
            return {
                status: true,
                number: value
            };
        }
        return {
            status: false,
            number: value
        };
    };
}

function pipeSeq (sequencer, ...args) {
    return {
        pipeline: (pipe) => {
            this.pipe = pipe;
            return {
                invoke: () => {
                    return sequencer.bind(this, ...args);
                }
            };
        }
    };
}

const pipedSeq = pipeSeq(rangeSeq, 2, 3) // 2, 5, 8, 11
    .pipeline(isEven) // 2, 7(5+2), 15(7+8), 26(15+11)
    .invoke();

const seq = generator(pipedSeq);

const generatorObj = generator(partialSumSeq, 1, 2, 4, 5);
