// function fibonacciSeq () {
//     if (this.counter < 1) {
//         return 0;
//     }
//
//     if (this.counter <= 2) {
//         return 1;
//     }
//
//     console.log('F: ', this.previousValue);
//     console.log('F: ', this.currentValue);
//     console.log('F: ', this.counter);
//
//     return this.previousValue + this.currentValue;
// }

function fibonacciSeq () {
    let counter = 0;
    let previousValue = 0;
    let currentValue = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

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

        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

function factorialSeq () {
    let counter = 0;
    let currentValue = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        let temp;
        if (counter === 0 || counter === 1) {
            temp = 1;
        } else {
            temp = counter * currentValue;
        }

        currentValue = temp;
        counter++;

        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

function rangeSeq (start, step) {
    let counter = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }
    return () => {
        const currentValue = (step * counter++) + start;
        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

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

function partialSumSeq (...args) {
    let counter = 0;

    let pipeline;
    if (this.pipe) {
        pipeline = this.pipe();
    }

    return () => {
        if (args.length === counter) {
            throw new Error('Out of sequence');
        }

        const currentValue = args.reduce((a, b, c) => {
            if (c > counter) {
                return a;
            }
            return a + b;
        }, 0);

        counter++;
        if (pipeline) {
            return pipeline(currentValue);
        } else {
            return currentValue;
        }
    };
}

function generator (sequencer, ...args) {
    const seq = sequencer.apply(this, [...args]);

    return {
        next: () => {
            return seq();
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

function piper (pipe, func) {
    const seq = func();
    return () => {
        return pipe()(seq());
    };
}

// function piper (...fs) {
//     return () => {
//         return fs.reduce((args, f) => [f.apply(this, args)], [])[0];
//     };
// }

// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

function pipeSeq (sequencer, ...args) {
    return {
        pipeline: function (pipe) {
            this.pipe = pipe;
            return this;
        },
        invoke: function () {
            return sequencer.bind(this, ...args);
        }
    };
}

// const seq = generator(fibonacciSeq);
// const generatorObj = generator.call({
//     currentValue: 0,
//     previousValue: 0,
//     counter: 0
// }, fibonacciSeq, 1, 3, 4, 5);

// console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());

// console.log(generatorObj.next());
// console.log(generatorObj.next());

const pipedSeq = pipeSeq(partialSumSeq, 2, 3, 3, 4) // 2, 5, 8, 11
    .pipeline(isEven) // 2, 7(5+2), 15(7+8), 26(15+11)
    .invoke();

const pipedSeq2 = pipeSeq(factorialSeq, 1, 2) // 2, 5, 8, 11
    .pipeline(isEven) // 2, 7(5+2), 15(7+8), 26(15+11)
    .invoke();

const seq2 = generator(pipedSeq);
const seq3 = generator(pipedSeq2);

console.log(seq2.next());
console.log(seq2.next());
console.log(seq2.next());
console.log(seq2.next());
console.log(seq2.next());
console.log(seq2.next());
//
console.log(seq3.next());
console.log(seq3.next());
console.log(seq3.next());
