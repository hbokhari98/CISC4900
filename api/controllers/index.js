const express = require('express');

const router = express.Router();


// Load each controller
// const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const authController = require('./auth');
const petsController = require('./pets');
const usersController = require('./users');
const apptsController = require('./appts');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
// router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
router.use('/auth', authController);
router.use('/pets', petsController);
router.use('/users', usersController);
router.use('/appts', apptsController);

module.exports = router;
