function generator (sequencer, ...args) {
    const seq = sequencer.apply(this, [...args]);

    return {
        next: () => {
            return seq();
        }
    };
}

module.exports = generator;
