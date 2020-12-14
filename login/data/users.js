const express = require('express');
const router = express.Router();
const db = require('./db.js');
const tokenChecker = require('./tokenchecker.js');


//API used during the test phase, return the entire collection of users
router.get('',async (req, res) => {
		let users = await db.users();
    res.status(200).json(users);
});
//API used to authenticate from the login page
router.post('/auth', async (req, res) => {
	console.log("auth richiesta");
		let user= await db.authenticate(req.body.email,req.body.password);
		console.log("userrrrrrrrrrrrrr.\n"+JSON.stringify(user));
    res.status(200).json(user);
});

//insert a new user in the database (default admin:false)
router.post('',async (req, res) => {
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
	console.log(user);
    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
		console.log("errore parametri")
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    let userId = await db.insert_user(user);
		if(userId){
    	res.location("/api/v1/users/" + userId).status(201).json({ok:"User correctly registered"});
		}else {
			res.status(400).json({error:"This email is already in our database"})
		}
});

router.use('', tokenChecker);
router.delete('', async(req, res) => {
    let user = {
		id:req.body.id
    };
	console.log(user);
	let del=await db.delete_user(user.id);
	if(del.ok){
		if(del.n==1){
		res.status(201).send("eliminato "+user.id+" "+JSON.stringify(del));
		}
		else{
			res.status(201).send("nessun utente corrispondente all'ID selezionato");
		}
	}
	else{
		res.status(404).send("errore durante l'eliminazione");
	}
});

//get user info by id
router.get('/:id', async (req, res) => {
	let user = await db.get_userbyID(req.params.id);
	console.log(user);
	if(user)
		res.status(200).json(user);
	else{
		res.status(404).json({message:"user not found"});
	}
});
router.post('/updateInfo', (req, res) => {
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
				id: req.body.self
    };
		console.log(user);
    let userId = db.update_info(req.body.email,req.body.username,req.body.password,req.body.self);
    res.status(201).send();
});
function checkIfEmailInString(text) {//checks wether the string is in a valid email format
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;
