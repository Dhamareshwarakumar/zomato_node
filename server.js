const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


// Middlewares
app.use(cors());
app.use(express.json());


// Configuration
require('./config/db');


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Zomato welcomes you to the world of food' });
});
app.use('/api/auth', require('./routes/auth'));


// Server
app.listen(PORT, () => console.log(`[Express Server] Server running @${PORT}`));