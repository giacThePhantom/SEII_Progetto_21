const express = require('express');
const router = express.Router();
const db = require('../Ensembl_communication/db_conn.js');


//API used during the test phase, return the entire collection of users
router.get('',async (req, res) => {
		let ok="server online"
    res.status(200).json(ok);
});
router.get('/:id', async (req, res) => {
	let tree = await db.get_treebyID(req.params.id);
	console.log(tree.id);
	if(tree)
		res.status(200).json(tree);
	else{
		res.status(404).json({message:"tree not found"});
	}
});
module.exports=router;
