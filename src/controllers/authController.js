const userModel = require('../models/users.js');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {
  const { mailId, password } = req.body;

  return bcrypt.hash(password, 10)
    .then(hashedPassword => userModel.addNewUser(mailId, hashedPassword))
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = {
  signUp
}
