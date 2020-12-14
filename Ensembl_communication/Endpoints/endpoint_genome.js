const express = require('express')
const router = express.Router();
const conn = require('../db_endpoints.js');

router.get('/compara', (req, res) => {
	let species1 = req.query.species1;
	let species2 = req.query.species2;
	let chr = req.query.chr;
	console.log(req.query.token);
	if(req.query.token){
		conn.insert_search(JSON.parse(req.query.token),"/compara?specie1="+req.query.species1+"&specie2="+req.query.species2);
	}
	if(!chr){
		conn.get_compara_genomes(species1, species2).then((ret) => {
			if(ret.error){
				res.status(404).json(ret);
			}
			else{
				res.status(200).send(ret);
			}
		});
	}
	else{
		conn.get_compara_chr(species1, species2, chr).then((ret) => {
			if(ret.error){
				res.status(404).json(ret);
			}
			else{
				res.status(200).send(ret);
			}
		});
	}
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




router.get('/:species', async (req, res) => {
	let species = req.params.species;
	await conn.get_genome_of_species(species).then((ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

module.exports = router;
