const process_new_gene_data = require('./write_data.js').write_new_gene_data;
const mongoose = require('mongoose');
const models = require('./models');

async function insert_new_gene(id, species){
	let all_species = await models.species_model.find({}, {'name' : true, '_id' : false});
	let final_species = [];
	for(let temp of all_species){
		if(temp.name != species){
			final_species.push(temp.name);
		}
	}
	process_new_gene_data(id, final_species);
}



async function has_to_be_saved(id){
	let all_species = await models.species_model.find({}, {'name' : true, '_id' : false});
	let species = [];
	let ret_species;
	
	for(let temp of all_species){
		if(await models.species_model.exists({'name' : temp.name, 'genes' : id})){
			ret_species = temp.name;
		}
	}
	return ret_species;
}


module.exports = {

	get_gene_info_for_species: async (species, identifier) => {
		let species_found = await models.species_model.findOne({'name': species }, {_id : false});
		let res = {};
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
					insert_new_gene(identifier, species);
					res = {error : 'This gene will be uploaded shortly'};
				}
				else{
					res = gene_info;
				}
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
	},

	get_gene_info: async (id, filters) => {
		let gene_found;
		if(filters.format == 'condensed'){
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : false});
		}
		else{
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false});
		}
		let res;
		if(!gene_found){
			let species = await has_to_be_saved(id);
			if(!species)
				res = {error : "Cannot find gene " + id};
			else{
				res = {error : 'This gene will be updated shortly'};
				insert_new_gene(id, species);
			}
		}
		else{
			res = gene_found;
		}
		return res;
	},
	get_sequence_of_gene: async (id) => {
		let sequence = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : true});
		let res;
		if(!sequence){
			let species = await has_to_be_saved(id);
			if(!species)
				res = {error : 'Gene ' + id + " doesn't exists"};
			else{
				res = {error : 'This gene will be updated shortly'};
				insert_new_gene(id, species);
		}
		else{
			res = sequence;
		}
		return res;
	},

	get_genome_of_species: async (id) => {
		let genome = await models.species_model.findOne({'name' : id}, {_id : false});
		let res;
		if(!genome){
			res = {error: 'Genome of species: ' + id + " doesn't exists"};
		}
		else{
			res = genome;
		}
		return res;
	}


};
