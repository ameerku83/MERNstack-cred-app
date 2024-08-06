const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/auth');
const productRoutes = require('./routes/prductroute');
const path=require("path")
const app = express();
const PORT = 5000;
require("dotenv").config()


app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use('/', userRoutes);   
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
