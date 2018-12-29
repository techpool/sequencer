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

module.exports = isEven;
