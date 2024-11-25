const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

mongoose.connect(process.env.DB)
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("Database connection error: ", error));

module.exports = app;
