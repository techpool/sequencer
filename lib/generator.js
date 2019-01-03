function generator (sequencer, ...args) {
    const seq = sequencer.apply(this, [...args]);
    let pipeline;
    if (sequencer.pipe) {
        pipeline = sequencer.pipe();
    }

    return {
        next: () => {
            if (pipeline) {
                return pipeline(seq());
            }
            return seq();
        }
    };
}

module.exports = generator;
