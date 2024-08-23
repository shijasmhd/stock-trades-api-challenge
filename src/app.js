const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const tradeRoute = require('./routes/trades.js');
const authRoute = require('./routes/auth.js');

dotenv.config({path: path.join(__dirname, '../.env')});

app.use(express.json());

app.use('/trades', tradeRoute);
app.use('/auth', authRoute);

module.exports = app;