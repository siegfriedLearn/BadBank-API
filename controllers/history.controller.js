const { searchByUid, changeBalance, addTransaction } = require("../helpers/dal");

const getBalanceByUid = async (req, res) => {
  const { uid } = req;
  //console.log(uid)

  if (uid) {
    searchByUid(uid)
      .then((history) => {
        res.status(200).json({
          status: "success",
          history
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
