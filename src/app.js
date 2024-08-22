const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../.env')});

module.exports = app;