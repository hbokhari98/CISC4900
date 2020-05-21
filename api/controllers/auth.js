const router = require('express').Router();
const { User } = require('../models');
const passport = require('../middlewares/authentication');


router.post('/signup', (req, res) => {
  // console.log("POST body: ", req.body);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      req.login(user, () => res.sendStatus(201));
    })
    .catch((err) => {
      res.status(400).json({ msg: 'User creation failed', err });
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
