const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })

};

module.exports = {
    jwtGenerator
}