const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.post('/register', async (req, res) => {
  const { name, phone, password, auth } = req.body;
  if (auth == '1234') {
    const newUser = {
      name,
      phone,
      password
    };
    await db.query(`INSERT INTO Users set ?`, [newUser]);
    res.send('router working - user section');
  } else {
    res.send('No tiene Autorizacion para realizar esta operacion');
  }
});

module.exports = router;
