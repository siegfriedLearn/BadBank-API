//Este index se usa para facilitar la exportación de los middlewares

const verifyJwt =require('./verifyJwt');
const verifyProfile =require('./verifyProfile');
const verifyBodyUser = require('./verifyBodyUser');
const verifyBodyCorrespondent = require('./verifyBodyCorrespondent')

module.exports={
    ...verifyJwt,
    ...verifyProfile,
    ...verifyBodyUser,
    ...verifyBodyCorrespondent
}
