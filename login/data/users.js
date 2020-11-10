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
router.post('', (req, res) => {
    let user = {
        email: req.body.email
    };

    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    let userId = db.users.insert(user);

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    res.location("/api/v1/users/" + userId).status(201).send();
});



// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;
