const express = require('express');
const router = express.Router();
const conn = require('./db_conn.js');

router.get('/api/v2/gene/:id', (req, res) => {
	const filters = req.query;
	console.log(filters);
	let id = req.params.id;
	conn.get_gene_info(id, filters).then( (ret) =>{
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

router.get('/api/v2/gene/sequence/:id', (req, res) => {
	let id = req.params.id;
	conn.get_sequence_of_gene(id).then((ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});

});


