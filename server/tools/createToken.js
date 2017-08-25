const config = require('../configs');
const jwt = require('jsonwebtoken');

function CreateToken(userId) {
    let secretKey = config.jwt.secret;
    let expiresIn = config.jwt.expiresIn;
    return jwt.sign({
        id: userId
    }, secretKey, {
        expiresIn
    });
}

module.exports = CreateToken;