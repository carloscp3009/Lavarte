const express = require('express');

// inizializations
const app = express();

// settings
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json({ extended: false }));

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/clients', require('./routes/api/clients'));

// starting
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
