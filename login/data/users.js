const express = require('express');
const router = express.Router();
const db = require('./db.js');


router.get('', (req, res) => {
    let users = db.users.all()
    .filter( (entry) => {
        if( req.query.email )
            return entry.email == req.query.email;
        return true;
    }).map( (entry) => {
        return {
            self: '/api/v1/users/' + entry.id,
            email: entry.email,
						username: entry.username,
						admin: entry.admin
        }
    });
    res.status(200).json(users);
});

router.post('/auth', (req, res) => {
    let users = db.users.all()
    .filter( (entry) => {
						console.log(req.body.password);
            return entry.email == req.body.email && entry.password== req.body.password; //checks for credentials in the database
    }).map( (entry) => {
        return { //format output returning only some infos
            self: '/api/v1/users/' + entry.id,
            email: entry.email,
						username: entry.username,
						admin: entry.admin
        }
    });
    res.status(200).json(users);
});

//get user info by id
router.get('/:id', (req, res) => {
    let users = db.users.all()
    .filter( (entry) => {
            return entry.id == req.params.id;
    }).map( (entry) => {
        return {
            self: '/api/v1/users/' + entry.id,
            email: entry.email,
						username: entry.username,
						admin: entry.admin
        }
    });
    res.status(200).json(users);
});
//insert a new user in the database (default admin:false)
router.post('', (req, res) => {
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        admin: false,
    };

    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    let userId = db.users.insert(user);
    res.location("/api/v1/users/" + userId).status(201).send();
});



function checkIfEmailInString(text) {//checks wether the string is in a valid email format
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;
