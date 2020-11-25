const mongoose = require('mongoose');
const models = require('../Ensembl_communication/models.js');




module.exports = {
	get_gene_info_for_species: async (species, identifier) => {
		let species_found = await models.species_model.findOne({'name': species });
		let res;
		if(!species_found){
			res = {Error : "Cannot find species selected"};
		}	
		else{
			if(!species_found.genes.includes(identifier)){
				res = {Error : 'Cannot find gene in species ' + species};
			}
			else{
				let gene_info = await models.genes_model.findOne({'id' : identifier});
				if(!gene_info){
					res = {Error : 'This gene will be uploaded shortly'};
				}
				console.log(gene_info);
				res = gene_info;
			}
		}
		return res;
	}	



}
