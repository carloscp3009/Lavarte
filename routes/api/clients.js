const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const auth = require('../../middlewares/auth');

// @route   GET api/clients
// @desc    Get all Clients
// @access  Private
router.get('/', auth, async (req, res) => {
  const clients = await db.query('SELECT * FROM Clients');
  res.json(clients);
});

// @route   POST api/clients
// @desc    Register new client
// @access  Private
router.post('/', auth, async (req, res) => {
  const { id, name, phone, address, birthday } = req.body;
  const newClient = {
    id,
    name,
    phone,
    address,
    birthday
  };
  const client = await db.query('SELECT * FROM Clients WHERE id = ?', [id]);
  if (client.length > 0) {
    res.send('Client already exist!');
  } else {
    await db.query(`INSERT INTO Clients set ?`, [newClient]);
    res.send('New client registered');
  }
});
module.exports = router;
