/* eslint-disable no-param-reassign */
const express = require('express');
const passport = require('../middlewares/authentication');
const db = require('../models');
const { isAdmin, usersMatch: isOwner } = require('../utils/verification.js');

const router = express.Router();
const { Pet } = db;

// Routes defined by this controller
//    GET    /pets
//    POST   /pets
//    GET    /pets/:id
//    PUT    /pets/:id
//    DELETE /pets/:id

// There are other styles for creating these route handlers

router.get('/', passport.isAuthenticated(), (req, res) => {
  if (!isAdmin(req.user)) {
    return res.sendStatus(401);
  }

  return Pet.findAll()
    .then((pets) => res.json(pets));
});

router.get('/:petId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.petId;

  Pet.findByPk(id)
    .then((pet) => {
      if (!pet) {
        return res.sendStatus(404);
      }

      if (!isOwner(pet.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      return res.json(pet);
    });
});


router.post('/', passport.isAuthenticated(), (req, res) => {
  Pet.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    breed: req.body.breed,
    description: req.body.description,
    microchip: req.body.microchip,
    sex: req.body.sex,
    spayed: req.body.spayed,
    vaccinated: req.body.vaccinated,
    notes: req.body.notes,
    userId: req.user.id,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:petId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.petId;

  Pet.findByPk(id)
    .then((pet) => {
      if (!pet) {
        return res.sendStatus(404);
      }

      if (!isOwner(pet.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      const form = req.body;

      // const fields = ['name', 'birthdate'];
      // fields.forEach((fname) => {
      // if(form[fname])
      //    pet[fname] = form[fname]
      // })

      if (form.name) {
        pet.name = form.name;
      }

      if (form.birthdate) {
        pet.birthdate = form.birthdate;
      }

      if (form.description) {
        pet.description = form.description;
      }

      if (form.microchip) {
        pet.microchip = form.microchip;
      }

      if (form.breed) {
        pet.breed = form.breed;
      }

      if (form.sex) {
        pet.sex = form.sex;
      }

      if (form.spayed) {
        pet.spayed = form.spayed;
      }

      if (form.vaccinated) {
        pet.vaccinated = form.vaccinated;
      }

      if (form.notes) {
        pet.notes = form.notes;
      }

      return pet.save()
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
});

router.delete('/:petId', passport.isAuthenticated(), (req, res) => {
  const id = req.params.petId;

  Pet.findByPk(id)
    .then((pet) => {
      if (!pet) {
        return res.sendStatus(404);
      }

      if (!isOwner(pet.userId, req.user.id)) {
        return res.sendStatus(401);
      }

      pet.destroy();
      return res.sendStatus(204);
    });
});

module.exports = router;
