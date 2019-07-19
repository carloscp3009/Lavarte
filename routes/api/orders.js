const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const db = require('../../config/db');

// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.get('/', auth, (req, res) => {
  res.send('router working - order section');
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.post('/register', auth, async (req, res) => {
  const { remision, cedula, pickup, deliver, driver } = req.body;
  let time = new Date(Date.now());
  time = time.toString().split('GMT')[0];

  let newOrder = {
    remision,
    cedula,
    pickup,
    deliver,
    time,
    user: req.user.name,
    driver
  };
  await db.query('INSERT INTO Orders set ?', [newOrder]);
  res.json('New order added');
});
module.exports = router;
