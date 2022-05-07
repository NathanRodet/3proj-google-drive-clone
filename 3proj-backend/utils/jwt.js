const jwt = require('jsonwebtoken');
require('dotenv/config');

// Generate access token to bypass middleware authentication

function generateAccessToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      is_admin: user.is_admin,
      is_blocked: user.is_blocked
    },
    process.env.SECRET_TOKEN,
    { expiresIn: process.env.SECRET_TOKEN_DURATION }
  )
  return token
}

// authenticate access token

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || authHeader && authHeader.split(' ')[0] || req.cookies.JSESSIONID;
  console.log(token)
  if (!token) {
    return res.status(401).send("No token found");
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    return next();
  })
}

module.exports = { authenticateToken, generateAccessToken };