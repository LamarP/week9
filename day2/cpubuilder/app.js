const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authentication');
const cpuRoutes = require('./routes/cpus');

const MONGODB_URI = 'mongodb+srv://dummy:abc123dummy@cluster0.smrld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT_NUMBER = 4000;

const app = express();

app.use(express.urlencoded()); // potentially take one of these out??
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(cpuRoutes);

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(PORT_NUMBER, () => {
        console.log(`Connected to local database. Server running on port: ${PORT_NUMBER}`);
    })
})