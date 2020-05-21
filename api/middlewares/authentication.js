/* eslint-disable no-param-reassign */

const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

/*
  The following code runs at login time.
  The usernameField and passwordField options refer to the HTTP requests
  body parameter names. I've set this to look for an `email` parameter,
  but you may prefer to use a `username` parameter instead of an email.
  BEST PRACTICE: don't state why login failed to the user.
*/
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(email, password, done) => {
  User.findOne({
    attributes: ['id', 'passwordHash'],
    where: { email },
  })
    .then(async (user) => {
      if (!user) {
        console.log('\n\nFailed Login: user does not exist\n\n');
        return done(null, false, { message: 'Failed Login' });
      }

      const passwordsMatch = await bcrypt.compare(password, user.passwordHash)
        .catch((err) => done(err));

      if (!passwordsMatch) {
        console.log('\n\nFailed Login: passwords did not match\n\n');
        return done(null, false, { message: 'Failed Login' });
      }

      console.log('\n\nSuccessful Login\n\n');

      user = user.dataValues;
      delete user.passwordHash;

      console.log(user);
      return done(null, user, { message: 'Successfully Logged In!' });
    })
    .catch((err) => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id, {
    attributes: ['id'],
  })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    })
    .catch((err) => done(err, null));
});

// Use this protect api routes that require a user to be logged in.
passport.isAuthenticated = () => (req, res, next) => (req.user ? next() : res.sendStatus(401));


module.exports = passport;
