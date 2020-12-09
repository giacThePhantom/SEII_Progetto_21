const express = require('express');
const app = express();

var port = process.env.PORT || 8000;
app.use(express.json());

app.use('/', express.static('static'));

const qanda = require('./qanda.js');

app.use('/api/v1/qanda',qanda);

//default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error : '404 not found' });
});

app.listen(port, function() {
    console.log('Server running on port ', port);
});

module.exports = app;   