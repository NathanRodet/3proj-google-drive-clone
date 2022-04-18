const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const jwt = require('../../middleware/jwt');
const bcrypt = require("bcryptjs");
const Joi = require('Joi');

/* GET index */
router.post('/login', async (req, res) => {

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
          res.status(400).json("Cannot compare password : " + error);
        };
      } else {
        res.status(400).json("Bad username, try again");
      }
    } catch (error) {
      res.status(500).json("Problem fetching users : " + error);
    }
  }
});

router.post('/register', async (req, res) => {

  const joiSchema = Joi.object().keys({
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string().required(),
  });

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        res.status(400).json("The username " + req.body.username + " is already used, choose a new one.");
      } else {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 16);
          const newUser = new User({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            mail: req.body.mail
          });
          const savedUser = await newUser.save();
          res.json(savedUser.username + ", your account has been created");
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: error });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
});

module.exports = router;