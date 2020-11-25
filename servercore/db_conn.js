const mongoose = require('mongoose');
const models = require('../Ensembl_communication/models.js');




module.exports = {
	get_gene_info_for_species: async (species, identifier) => {
		let species_found = await models.species_model.findOne({'name': species }, {_id : false});
		let res;
		if(!species_found){
			res = {error : "Cannot find species selected"};
		}	
		else{
			if(!species_found.genes.includes(identifier)){
				res = {error : 'Cannot find gene in species ' + species};
			}
			else{
				let gene_info = await models.genes_model.findOne({'id' : identifier}, {_id : false});
				if(!gene_info){
					res = {error : 'This gene will be uploaded shortly'};
				}
				console.log(gene_info);
				res = gene_info;
			}
		}
		return res;
	},
	
	get_all_genes_for_species: async (species) => {
		let genes_found = await models.species_model.findOne({'name' : species}, {_id : false});
		let res;
		if(!genes_found){
			res = {error: 'Cannot find species ' + species};
		}
		else{
			res = genes_found;
		}
		return res;
	},

	get_all_species: async () => {
		let species_found = await models.species_model.find({}, {name: true, _id : false});
		return species_found;
	}
	




}
