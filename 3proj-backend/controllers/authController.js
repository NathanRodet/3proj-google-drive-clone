const User = require('../models/Users');
const jwt = require('../utils/jwt');
const bcrypt = require("bcryptjs");
const Joi = require('Joi');

const authLogin = async (req, res) => {

  const joiSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details[0].message);
  } else {
    try {

      // If no user, reject
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(400).json({ message: "Bad login, try again" });

      // Password hash comparison
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (err) {
          console.log(err);
        }
        if (match) {
          // Generate access Token
          const accessToken = jwt.generateAccessToken(user);

          // Send Token
          res.status(200).json({ token: accessToken });
        } else {
          // If bad password reject
          return res.status(400).json({ message: "Bad login, try again" })
        }
      })

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failure during authentication process" });
    }
  }
};

module.exports = { authLogin }