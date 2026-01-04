const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather'); // Import weather route
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the route
app.use('/api', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
