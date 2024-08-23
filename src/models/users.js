const db = require('./db.js');

const addNewUser = (mailId, password) => {
  return db.user.create({
    data: {
      mail_id: mailId,
      password: password
    }
  });
};

const getUserDetails = (user_id) => {
  return db.user.findUnique({
    where: {user_id}
  });
}

module.exports = {
  addNewUser,
  getUserDetails
};