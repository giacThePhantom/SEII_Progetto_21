const express = require('express')
const router = express.Router();
const conn = require('../db_endpoints.js');


router.get('/:species', (req, res) => {
	let species = req.params.species;
	conn.get_genome_of_species(species).then((ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

router.get('/:species/:start/:end', (req, res) => {
	let species = req.params.species;
	let start = req.params.start;
	let end = req.params.end;
	conn.get_genome_from_to(species, start, end).then((ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});





module.exports = router;
