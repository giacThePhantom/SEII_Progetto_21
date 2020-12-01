const express = require('express');
const router = express.Router();
const conn = require('./db_conn.js');


router.get('/:species/:identifier', function (req, res) {
  var species = req.params.species;
  var identifier = req.params.identifier;
	conn.get_gene_info_for_species(species, identifier).then((ret) => {
		if(res.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

router.get('/:species', function (req, res) {
    var species = req.params.species;
	conn.get_all_genes_for_species(species).then( (ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
})




router.get('', function(req, res) {
	conn.get_all_species().then((ret) => {
		res.status(200).send(ret);
	})
});

module.exports = router;
