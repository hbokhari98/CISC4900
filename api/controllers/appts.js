/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');

const { Appointment } = db;
const { isAdmin, usersMatch: isApptMaker } = require('../utils/verification.js');

// Routes defined by this controller
//    GET    /appt
//    POST   /appt
//    GET    /appt/:id
//    PUT    /appt/:id
//    DELETE /appt/:id

// There are other styles for creating these route handlers

router.get('/', passport.isAuthenticated(), (req, res) => {
  if (!isAdmin(req.user)) {
    return res.sendStatus(401);
  }

  return Appointment.findAll()
    .then((appt) => {
      res.json(appt);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.get('/:apptId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.apptId;

  Appointment.findByPk(id)
    .then((appt) => {
      if (!appt) {
        return res.sendStatus(404);
      }

      if (!isApptMaker(appt.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      return res.json(appt);
    });
});


router.post('/', passport.isAuthenticated(), (req, res) => {
  const content = req.body;

  Appointment.create({
    apptTime: content.apptTime,
    task: content.task,
    userId: req.user.id,
    petId: content.petId,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(400).json({ msg: '/api/appointments POST failed', err });
    });
});


router.put('/:apptId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.apptId;

  Appointment.findByPk(id)
    .then((appt) => {
      if (!appt) {
        return res.sendStatus(404);
      }

      if (!isApptMaker(appt.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      const form = req.body;

      if (form.apptTime) {
        appt.apptTime = form.apptTime;
      }

      if (form.task) {
        appt.task = form.task;
      }

      if (form.petId) {
        appt.petId = form.petId;
      }

      return appt.save()
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
});


router.delete('/:apptId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.apptId;

  Appointment.findByPk(id)
    .then((appt) => {
      if (!appt) {
        return res.sendStatus(404);
      }

      if (!isApptMaker(appt.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      appt.destroy();
      return res.sendStatus(204);
    });
});

module.exports = router;
