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
      // Check User
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(400).json({ message: "Bad login, try again" });

      // Password Comparison
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) return res.status(400).json({ message: "Bad login, try again" })

      // Send Token
      const accessToken = jwt.generateAccessToken(user);
      res.status(200).json({ token: accessToken });

    } catch (error) {
      res.status(500).json({ message: "Failure during authentication process" });
    }
  }
};

module.exports = { authLogin }