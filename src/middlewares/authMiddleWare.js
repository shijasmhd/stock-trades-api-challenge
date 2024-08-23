const jwt = require('jsonwebtoken');
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({error: 'No token'});

  return jwt.verify(token, accessTokenKey, (err) => {
    if (err) return res.status(403).json({error: 'Invalid token'});

    next();
  });
};