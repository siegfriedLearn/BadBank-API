//sdk admin firebase
const admin = require("firebase-admin");
const serviceAccount = require("../badbank-f77f3-firebase-adminsdk-rhfz3-19d12e6e14.json"); // Ruta al archivo JSON de credenciales

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://badbank-f77f3-default-rtdb.firebaseio.com",
});

const {
  searchByUid,
  changeBalance,
  addTransaction,
} = require("../helpers/dal");

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
          await nombresTransacciones.forEach((element) => {
            const infoTransaccion = {
              fecha: history.transacciones[element].fecha,
              tipo: history.transacciones[element].tipo,
              value: history.transacciones[element].value,
            };
            arrayTransacciones.push(infoTransaccion);
          });
        }

        //console.log(arrayTransacciones)
        res.status(200).json({
          status: "success",
          balance: history.balance,
          transacciones: arrayTransacciones,
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
    changeBalance(uid, balance)
      .then(async (resp) => {
        const transaction = await addTransaction(uid, tipo, valor);
        console.log(transaction);
        res.status(200).json({
          status: resp,
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

const transfer = async (req, res) => {
  const { email, valor, personaQueEnvia } = req.body;

  if (email) {
    const auth = admin.auth();

    auth
      .getUserByEmail(email)
      .then(async (userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        //console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        try {
          const traerBalance = await searchByUid(userRecord.uid);
        let nuevoSaldo = parseInt(traerBalance.balance) + parseInt(valor);
        //console.log(nuevoSaldo)
        const modificarBalance = await changeBalance(userRecord.uid, nuevoSaldo)
        const agregarTransaccion = await addTransaction(userRecord.uid, `Recibido de ${personaQueEnvia}`, valor, )
        res.status(200).json({
          status: "Ok",
        });
        } catch (error) {
          res.status(400).json({
            status: error,
          });
        }
        
      })
      .catch((error) => {
        //console.log("Error fetching user data:", error);
        res.status(400).json({
          status: error.code,
        });
      });
  } else {
    res.status(400).json({
      status: "Error no email",
    });
  }
};

module.exports = {
  getBalanceByUid,
  modifyBalance,
  transfer,
};
