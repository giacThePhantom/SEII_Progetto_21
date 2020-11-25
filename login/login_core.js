const express = require('express');
const app = express();

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.use(express.json());



app.use('/', express.static('static'));



/**
 * Middleware to manage authentication
 * https://expressjs.com/it/guide/writing-middleware.html
 * https://expressjs.com/it/guide/using-middleware.html
 */
app.use((req, res, next) => {
    req.loggedUser = req.query.user;
    next();
});



/* Moduli per la gestione delle richieste alle API */
const users = require('./data/users.js');



app.use('/api/v1/users', users);





/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});


app.listen(port, function() {
  console.log('Server running on port ', port);
});
module.exports = app;
