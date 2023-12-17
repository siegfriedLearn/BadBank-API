const jwt = require('jsonwebtoken');
const {userVerification} = require('../helpers/userVerification')


//Recepción token y validación
const verifyJwt = async (req, res, next)=>{
    let token = req.header['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
        res.status(401).send( {
            error: 'Es necesario un token de autenticación'
        } )
        return
    }
    if ( token.startsWith('Bearer ')){
        token= token.slice(7, token.length);
        //console.log(token);
    }
    if ( token ){
        jwt.verify( token, process.env.SECRETKEY, async (error, decoded) =>{
            if ( error ) {
                return res.status(401).json({
                    message: 'El token no es valido'
                });
            }else{
                //con decoded.id hago la busqueda de ese usuario en la bd
                const user = await userVerification(decoded.id)

                //Usuario no existe en bd
                if ( !user ) {
                    return res.status(401).json({
                        message: "El token no es válido - Usuario no se encuentra en BD"
                    })
                }

                //verificar si el usuario está inactivo
                if ( !user.state ) {
                    return  res.status(401).json({
                        message: 'El token no es válido - Inactive'
                    });
                }
      
                //console.log(profile_id)
                req.user = user; 

                next();
            }
        })
    }
};

module.exports = { verifyJwt };