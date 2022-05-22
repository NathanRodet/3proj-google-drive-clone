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
      const foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        const foundPassword = foundUser.password;
        const result = await bcrypt.compare(req.body.password, foundPassword);
        if (result) {
          try {
            const accessToken = jwt.generateAccessToken(foundUser);
            res.status(200).json({ token: accessToken });
          } catch (error) {
            res.status(500).json({ message: "Generate token failure" });
          }
        } else {
          res.status(400).json({ message: "Bad login, try again" });
        }
      } else {
        res.status(400).json({ message: "Bad login, try again" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failure during authentication process" });
    }
  }
};

module.exports = { authLogin }