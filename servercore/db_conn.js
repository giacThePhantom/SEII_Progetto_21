const mongoose = require('mongoose');
const models = require('../Ensembl_communication/models.js');




module.exports = {
	get_gene_info_for_species: async (species, identifier) => {
		let species_found = await models.species_model.findOne({'name': species });
		return species;

	
	
	}	



}
