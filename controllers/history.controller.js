const { searchByUid, changeBalance, addTransaction } = require("../helpers/dal");

const getBalanceByUid = async (req, res) => {
  const { uid } = req;
  //console.log(uid)

  if (uid) {
    searchByUid(uid)
      .then(async (history) => {
          let arrayTransacciones = [];
          //console.log(history.transacciones)
          if (history.transacciones) {
            const nombresTransacciones = Object.keys(history.transacciones);
            //console.log(nombresTransacciones)
            await nombresTransacciones.forEach(element => {
              const infoTransaccion = {
                fecha: history.transacciones[element].fecha,
                tipo: history.transacciones[element].tipo,
                value: history.transacciones[element].value
              }
              arrayTransacciones.push(infoTransaccion);
            });
          }
          
          //console.log(arrayTransacciones)
        res.status(200).json({
          status: "success",
          balance: history.balance,
          transacciones: arrayTransacciones
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: err,
        });
      });
  } else {
    res.status(400).json({
      status: "Error no uid",
    });
  }
};

const modifyBalance = async (req, res) => {
  
  const { balance, tipo, valor } = req.body;
  const { uid } = req;

  if (uid) {
    changeBalance(uid, balance).then(async resp =>{
      const transaction = await addTransaction(uid, tipo, valor);
      console.log(transaction);
      res.status(200).json({
        status: resp,

      });
    }).catch(err=>{
      res.status(400).json({
        status: err,
      });
    })

  } else {
    res.status(400).json({
      status: "Error no uid",
    });
  }
};

module.exports = {
  getBalanceByUid,
  modifyBalance,
};
