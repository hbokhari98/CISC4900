/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');

const { User, Pet, Appointment } = db;
const { isAdmin, usersMatch } = require('../utils/verification.js');

// Routes defined by this controller
//    GET    /users
//    POST   /users
//    GET    /users/:id
//    GET    /users/:id/pets
//    GET    /users/:id/appts
//    PUT    /users/:id
//    DELETE /users/:id

// There are other styles for creating these route handlers

router.get('/', passport.isAuthenticated(), (req, res) => {
  if (!isAdmin(req.user)) {
    return res.sendStatus(401);
  }

  return User.findAll({
    attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.get('/:userId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return User.findByPk(id, {
    attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
  })
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      return res.json(user);
    });
});

router.get('/:userId/pets', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return Pet.findAll({
    where: {
      userId: id,
    },
    attributes: { exclude: ['userId'] },
  }).then((pets) => {
    if (!pets) {
      return res.sendStatus(404);
    }

    return res.json(pets);
  });
});

router.get('/:userId/appts', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return Appointment.findAll({
    where: {
      userId: id,
    },
    attributes: { exclude: ['userId'] },
  }).then((appts) => {
    if (!appts) {
      return res.sendStatus(404);
    }

    return res.json(appts);
  });
});

// Can be used by admins to create accounts
router.post('/', passport.isAuthenticated(), (req, res) => {
  // theoretical way to check if the user is an admin
  if (!isAdmin(req.user)) {
    return res.sendStatus(401);
  }

  const content = req.body;

  return User.create({
    firstName: content.firstName,
    lastName: content.lastName,
    email: content.email,
    password: content.password,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(400).json({ msg: '/api/users POST failed', err });
    });
});


router.put('/:userId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      const form = req.body;

      if (form.firstName) {
        user.firstName = form.firstName;
      }

      if (form.lastName) {
        user.lastName = form.lastName;
      }

      if (form.phone) {
        user.phone = form.phone;
      }

      if (form.email) {
        user.email = form.email;
      }

      if (form.address) {
        user.address = form.address;
      }

      if (form.selectedCity) {
        user.city = form.selectedCity;
      }

      if (form.selectedState) {
        user.state = form.selectedState;
      }

      if (form.zipcode) {
        user.zipcode = form.zipcode;
      }

      if (form.password) {
        user.password = form.password;
      }

      return user.save()
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
});

router.delete('/:userId/pets', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return Pet.destroy({
    where: {
      userId: id,
    },
  }).then((affectedRows) => {
    const responseMsg = `Deleted ${affectedRows} pets`;
    return res.status(204).json({ msg: responseMsg });
  });
});

router.delete('/:userId/appts', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return Appointment.destroy({
    where: {
      userId: id,
    },
  }).then((affectedRows) => {
    const responseMsg = `Deleted ${affectedRows} appointments`;
    return res.status(204).json({ msg: responseMsg });
  });
});


router.delete('/:userId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.userId;

  if (!usersMatch(id, req.user.id)) {
    return res.sendStatus(401);
  }

  return User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      user.destroy();
      return res.sendStatus(204);
    });
});

module.exports = router;
