const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const morgan=require("morgan");
const db = require('./db')
const app = express();
const PORT = 5000;


app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db


app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/prductroute'));


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


