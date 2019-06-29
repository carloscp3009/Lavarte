const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Auth and get token - Login
// @access  Public

router.post('/', async (req, res) => {
  const { phone, password } = req.body;

  const user = await db.query('SELECT * FROM Users WHERE phone = ?', [phone]);
  if (user.length < 1) {
    res
      .status(400)
      .json({ errors: [{ msg: 'Invalid Credentials - No user' }] });
  } else {
    const isMatch = password == user[0].password;
    if (isMatch) {
      // jwt
      const payload = {
        user: {
          name: user[0].name
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
  }
});

// @route   POST api/users/register
// @desc    Register and get token
// @access  Public
router.post('/register', async (req, res) => {
  const { name, phone, password, auth } = req.body;
  if (auth == '1234') {
    const newUser = {
      name,
      phone,
      password
    };
    await db.query(`INSERT INTO Users set ?`, [newUser]);

    // jwt
    const payload = {
      user: {
        name: newUser.name
      }
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } else {
    res.send('No tiene Autorizacion para realizar esta operacion');
  }
});

module.exports = router;
