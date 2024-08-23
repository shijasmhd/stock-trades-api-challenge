const db = require('./db.js');

const addNewUser = (mailId, password) => {
  return db.user.create({
    data: {
      mail_id: mailId,
      password: password
    }
  });
};

const getUserDetails = (mail_id) => {
  return db.user.findUniqueOrThrow({
    where: {mail_id}
  });
}

module.exports = {
  addNewUser,
  getUserDetails
};