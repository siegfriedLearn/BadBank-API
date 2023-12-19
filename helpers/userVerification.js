


const userVerification = async ( uid ) => {

  const query = {
    text: `select id, uid, username, profile_id, state  from ${schema}.users
      where
      id = $1`,
    values: [id],
  };
  let user;
  try {

    let datos = await pool.query(query);

    if (datos.rows.length > 0) {
    user = datos.rows[0]
    return user;

  } else {
    //console.log('error')
    return user

  }
  } catch (error) {
    return user   
  }
  

}

module.exports = { userVerification }