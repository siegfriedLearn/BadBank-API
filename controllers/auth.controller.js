
const { jwtGenerator } = require('../helpers/jwtGenerator');


const postLogin = async (req, res) => {
  const { uid } = req.body;
  try {
    if (uid) {
      //Generar token
      const token = await jwtGenerator( uid );
    
      //Envío respuesta
      res.status(200).json({
        status: "success",
        //data: datos.rows,
        token
      });  
    } else {
      res.status(400).json({
        status: "error",
        //data: "usuario incorrecto",
      });
      
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      status: "error.",
    });
  }
};


module.exports = {
  postLogin,
};
