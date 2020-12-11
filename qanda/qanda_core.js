const mongoose = require('mongoose');
const db_init = require('../Ensembl_communication/db_init');
const express = require('express');
const app = express();
const uri = 'mongodb://localhost:27017/genes?retryWrites=true&w=majority'

//Start the database
const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var port = process.env.PORT || 8000;
app.use(express.json());


const qanda = require('./qanda.js');
const users = require('../login/data/users.js');
app.use('/api/v1/users', users);
app.use('/api/v1/qanda',qanda);

app.use('/', express.static('static'));


//default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error : '404 not found' });
});

app.listen(port, function() {
    console.log('Server running on port ', port);
});

module.exports = app;   