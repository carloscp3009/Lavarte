const express = require('express');
const db = require('./config/db');

// inizializations
const app = express();

// settings
const PORT = process.env.PORT || 5000;

// middlewares
app.get('/', (req, res) => res.send('Api Running!!!'));

// public

// starting
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
