const bcrypt = require("bcryptjs");
const Joi = require('Joi');
const User = require('../models/Users');
const jwt = require('../utils/jwt');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(['-password', '-is_admin', '-is_blocked', '-__v']);
    if (users[0] === undefined) {
      res.sendStatus(204)
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Users : error fetching users " + error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select(['-password', '-is_admin', '-is_blocked', '-__v']);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: "Users : no user found for this id." })
    }
  } catch (error) {
    res.status(500).json({ message: "Users : bad id or errors : " + error });
  }
}

const getCount = async (req, res) => {
  try {
    const usersCount = await User.count();
    res.json(usersCount);
  } catch (error) {
    res.status(500).json({ message: "Users : cannot count users : " + error });
  }
}

const postUser = async (req, res) => {
  const joiSchema = Joi.object().keys({
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    mail: Joi.string().email().required(),
  });

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  }
  else {
    try {
      const foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        res.status(400).json({ message: "Users : the username " + req.body.username + " is already used, choose a new one." });
      }
      else {
        const hashedPassword = await bcrypt.hash(req.body.password, 16);
        const newUser = new User({
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hashedPassword,
          mail: req.body.mail
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Users : cannot post user : " + error });
    }
  }
};

const deleteSelf = async (req, res) => {
  const userJWT = req.user

  try {
    console.log(userJWT)
    if (userJWT.is_admin) {
      res.status(401).json("An administrator is not allowed to delete himself.");
    } else {
      const removedUser = await User.deleteOne({ _id: userJWT._id });
      res.json(removedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Users : cannot delete self : " + error });
  }
}

const deleteById = async (req, res) => {
  const userJWT = req.user

  if (userJWT.is_admin && (userJWT._id != req.params.userId)) {
    try {
      const removedUser = await User.deleteOne({ _id: req.params.userId });
      res.json(removedUser);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot delete by id : " + error });
    }
  } else {
    res.status(401).json({ message: "Users : you must be an administrator, an administrator cannot delete his account." })
  }
}

const patchUsername = async (req, res) => {
  const joiSchema = Joi.object().keys({
    username: Joi.string().required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedUsername = await User.updateOne(
        { _id: userJWT._id },
        { $set: { username: req.body.username } }
      );
      res.json(patchedUsername);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot patch : " + error });
    }
  }
}

const patchFirstName = async (req, res) => {
  const joiSchema = Joi.object().keys({
    first_name: Joi.string().required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedFirstName = await User.updateOne(
        { _id: userJWT._id },
        { $set: { first_name: req.body.first_name } }
      );
      res.json(patchedFirstName);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot patch : " + error });
    }
  }
}

const patchLastName = async (req, res) => {
  const joiSchema = Joi.object().keys({
    last_name: Joi.string().required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedLastName = await User.updateOne(
        { _id: userJWT._id },
        { $set: { last_name: req.body.last_name } }
      );
      res.json(patchedLastName);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot patch : " + error });
    }
  }
}

const patchMail = async (req, res) => {
  const joiSchema = Joi.object().keys({
    mail: Joi.string().email().required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedMail = await User.updateOne(
        { _id: userJWT._id },
        { $set: { mail: req.body.mail } }
      );
      res.json(patchedMail);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot patch : " + error });
    }
  }
}

const patchPassword = async (req, res) => {
  const joiSchema = Joi.object().keys({
    password: Joi.string().min(8).required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 8);
      const patchedPassword = await User.updateOne(
        { _id: userJWT._id },
        { $set: { password: newPassword } }
      );
      res.json(patchedPassword);
    } catch (error) {
      res.status(500).json({ message: "Users : cannot patch : " + error });
    }
  }
}

const patchIsBlocked = async (req, res) => {
  const joiSchema = Joi.object().keys({
    is_blocked: Joi.boolean().required()
  })

  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    if (req.user.is_admin) {
      try {
        const patchedPassword = await User.updateOne(
          { _id: req.params.userId },
          { $set: { is_blocked: req.body.is_blocked } }
        );
        res.json(patchedPassword);
      } catch (error) {
        res.status(500).json({ message: "Users : cannot patch : " + error });
      }
    } else {
      res.status(401).json({ message: "Users : you must be an administrator." })
    }
  }
}

module.exports = {
  getUsers, postUser, getUserById, getCount, deleteSelf,
  deleteById, patchUsername, patchFirstName, patchLastName,
  patchMail, patchPassword, patchIsBlocked
};