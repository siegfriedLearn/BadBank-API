

const isAdminProfile = ( req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            message: 'Se quiere verificar el perfil sin validar el token primero'
        })
    }

    const { profile_id, username } = req.user;

    if (profile_id !== 1) {
        return res.status(401).json({
            message: `${username} no tiene privilegios para realizar esta operación`
        });
    }

    next(); 
};

const hasProfile=( ...profiles ) =>{

    return (req, res, next)=>{

        if (!req.user) {
            return res.status(500).json({
                message: 'Se quiere verificar el perfil sin validar el token primero'
            })
        }

        if ( !profiles.includes( req.user.profile_id ) ) {
            return res.status(401).json({
                message: `El usuario ${req.user.username} requiere uno de estos perfiles: ${profiles} para ejecutar esta acción`
            })
        }

        next();
    }
}

module.exports={
    isAdminProfile,
    hasProfile
}