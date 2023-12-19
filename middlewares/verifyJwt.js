const jwt = require('jsonwebtoken');
const {userVerification} = require('../helpers/userVerification')


//Recepción token y validación
const verifyJwt = async (req, res, next)=>{
    let  token  =  req.headers['authorization'];
    //console.log(req.headers)
    
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
                //con decoded.uid hago la busqueda de ese usuario en la bd
                //const uid = await userVerification(decoded.uid)
                const uid = decoded.uid
                //console.log(decoded.uid)
                //Usuario no existe en bd
                if ( !uid ) {
                    return res.status(401).json({
                        message: "El token no es válido - Usuario no se encuentra en BD"
                    })
                }

                //verificar si el usuario está inactivo
                // if ( !uid.state ) {
                //     return  res.status(401).json({
                //         message: 'El token no es válido - Inactive'
                //     });
                // }
      
                //console.log(profile_id)
                req.uid = uid; 

                next();
            }
        })
    }
};

module.exports = { verifyJwt };