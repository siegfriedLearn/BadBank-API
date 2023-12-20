const { parse } = require("dotenv");
const { app } = require("../config/firebase");
const {
  getDatabase,
  ref,
  set,
  get,
  push,
  update,
  child,
} = require("firebase/database");

const searchByUid = (uid) => {
  const dbRef = ref(getDatabase());

  return new Promise((resolve, reject) => {
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const history = snapshot.val();
          //console.log(history);

          resolve(history);
        } else {
          const error = "No data available";
          reject(error);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const changeBalance = (uid, balance) => {
  const db = getDatabase();

  return new Promise((resolve, reject) => {
    update(ref(db, "/users/" + uid), { balance })
      .then((resp) => resolve("Ok"))
      .catch((err) => reject("error"));
  });
};

const addTransaction = (uid, tipo, value) => {
  const db = getDatabase();

  return new Promise((resolve, reject) => {
    const date = new Date();
    push(ref(db, "/users/" + uid + "/transacciones"),  {tipo, value, fecha: String(date)} )
        .then(resp => resolve('Ok.'))
        .catch(err=>reject('error'))

  });
};

module.exports = {
  searchByUid,
  changeBalance,
  addTransaction,
};
