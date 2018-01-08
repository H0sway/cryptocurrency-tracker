const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.create = (req,res) => {
  // Encrypt the passwords
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  // Create a new user
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/tracker');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

module.exports = usersController;
