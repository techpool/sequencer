const uuidv1 = require('uuid/v1');

function generateUuid () {
    return uuidv1();
}

module.exports = {
    generateUuid
};
