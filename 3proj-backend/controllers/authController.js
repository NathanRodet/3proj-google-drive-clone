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
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        try {
          const foundPassword = foundUser.password;
          const result = await bcrypt.compare(req.body.password, foundPassword);
          if (result) {
            try {
              const accessToken = jwt.generateAccessToken(foundUser);
              res.status(200).json({ token: accessToken, duration: process.env.SECRET_TOKEN_DURATION });
            } catch (error) {
              res.status(500).json("Cannot generate token : " + error);
            }
          } else {
            res.status(400).json("Bad password, try again");
          }
        } catch (error) {
          res.status(500).json("Cannot compare password : " + error);
        };
      } else {
        res.status(400).json("Bad username, try again");
      }
    } catch (error) {
      res.status(500).json("Problem fetching users : " + error);
    }
  }
};

module.exports = { authLogin }