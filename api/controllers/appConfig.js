const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'TruWalks',
    description: 'TruWalks for TruDogs',
  });
});


module.exports = router;
