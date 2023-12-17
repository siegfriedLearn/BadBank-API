const { app } = require("../config/firebase");
const { getDatabase, ref, set, get, push, update, child } = require("firebase/database");


const getBalanceByUid = async (req, res) => {
  const { uid } = req.params;

  if (uid) {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const history = snapshot.val();

        res.status(200).json({
          status: "success",
          history
        });

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      res.status(400).json({
        status: "error",

      });
    }); 
  }else{
    res.status(400).json({
      status: "Error no uid",
    });
  }
};



const modifyBalance = async (req, res) => {
  const { uid, balance } = req.body;

  if (uid) {
      const db = getDatabase();
    
      // A post entry.
      const postData = {
        uid,
        balance
      };
    
      // Get a key for a new Post.
      //const newPostKey = push(child(ref(db), 'users')).key;
    
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      //updates['/posts/' + newPostKey] = postData;
      updates['/users/' + uid ] = postData;
      update(ref(db), updates);
      //return 
      res.status(200).json({
        status: "success",
        
      });
    
  }else{
    res.status(400).json({
      status: "Error no uid",
    });
  }
};


module.exports = {
  getBalanceByUid,
  modifyBalance
};
