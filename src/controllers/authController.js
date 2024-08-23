const userModel = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordSalt = parseInt(process.env.PASSWORD_SALT_ROUNDS);
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

function verifyUser(password, userDetails) {
  return bcrypt.compare(password, userDetails.password)
    .then(isMatching => {
        if (isMatching) return userDetails;

        throw Error('Invalid credentials!');
    })
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, refreshTokenKey);
}

function generateAccessToken(payload) {
  return jwt.sign(payload, accessTokenKey, {expiresIn: 600});
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenKey, (err, decode) => {
      if (err) reject(err);

      resolve(decode);
    });
  });
}

const signUp = (req, res) => {
  const { mailId, password } = req.body;

  return bcrypt.hash(password, passwordSalt)
    .then(hashedPassword => userModel.addNewUser(mailId, hashedPassword))
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({error: err.message}));
};

const logIn = (req, res) => {
  const { mailId, password } = req.body;

  return userModel.getUserDetails(mailId)
    .then(verifyUser.bind(null, password))
    .then((userDetails) => {
      return Promise.all([
        generateRefreshToken({userId: userDetails.user_id}),
        generateAccessToken({userId: userDetails.user_id}),
        userDetails.user_id
      ]);
    })
    .then(([refreshToken, accessToken, userId]) => {
      return res.status(200).json({ refreshToken, accessToken, userId });
    })
    .catch(err => res.status(400).json({error: err.message}));
};

const validateToken = (req, res) => {
  const { token } = req.body; // Refresh token

  if (!token) return res.status(401).json({error: 'No token provided'});

  return verifyRefreshToken(token)
    .then((resp) => generateAccessToken({userId: resp.userId}))
    .then(accessToken => res.status(200).json({ accessToken }))
    .catch(() => res.status(403).json({error: 'Inavalid refresh token'}));
};

module.exports = {
  signUp,
  logIn,
  validateToken
}
