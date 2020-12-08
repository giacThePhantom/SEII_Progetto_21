const process_new_gene_data = require('./write_data.js').write_new_gene_data;
const mongoose = require('mongoose');
const models = require('./models');
const lodash = require('lodash');
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
		let species_found = await models.species_model.findOne({'name': species }, {_id : false, __v : false});
		let res = {};
		if(!species_found){
			res = {error : "Cannot find species selected"};
		}	
		else{
			if(!species_found.genes.includes(identifier)){
				res = {error : 'Cannot find gene in species ' + species};
			}
			else{
				let gene_info = await models.genes_model.findOne({'id' : identifier}, {_id : false, __v : false});
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
		let genes_found = await models.species_model.findOne({'name' : species}, {_id : false, __v : false});
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
		let species_found = await models.species_model.find({}, {name: true, _id : false, __v : false});
		return species_found;
	},

	get_gene_info: async (id, filters) => {
		let gene_found;
		if(filters.format == 'condensed'){
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : false, __v : false});
		}
		else{
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false, __v : false});
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
		let sequence = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : true, __v : false});
		let res;
		if(!sequence){
			let species = await has_to_be_saved(id);
			if(!species){
				res = {error : 'Gene ' + id + " doesn't exists"};
			}
			else{
				res = {error : 'This gene will be updated shortly'};
				insert_new_gene(id, species);
			}
		}
		else{
			res = sequence;
		}
		return res;
	},

	get_genome_of_species: async (id) => {
		let genome = await models.species_model.findOne({'name' : id}, {_id : false, __v : false});
		console.log(genome);
		let res = {};
		if(!genome){
			res = {error: 'Genome of species: ' + id + " doesn't exists"};
		}
		else{	
			let gene_list = await models.genes_model.find({'species' : genome.name}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, species : false, __v : false, homologies : {_id : false}});
			res.name = genome.name;
			res.genes = [];
			res.missing_genes = [];
			for(let gene_id of genome.genes){
				console.log(genome.genes[0]);
				console.log(gene_id);
				let gene_found = lodash.filter(gene_list, x => x.id === gene_id);
				gene_found = gene_found[0];
				console.log(gene_found);
				if(!gene_found){
					console.log('Missing gene');
					res.missing_genes.push(gene_id);
					insert_new_gene(gene_id, id);
				}
				else{
					res.genes.push(gene_found);
				}
			}
			if(res.missing_genes.length){
				res.error = 'Missing genes will be uploaded shortly';
			}
		}
		return res;
	},
	get_genome_from_to: async (species, start, end) => {
		let genome = await models.species_model.findOne({'name' : species}, {_id : false, __v : false});
		let res = {};
		if(!genome){
			res = {error: 'Genome of species: ' + species + " doesn't exists"};
		}
		else{
			res.name = genome.name;
			res.start = start;
			res.end = end;
			res.genes = []
			let genes_found = await models.genes_model.find({'start' : {$gte : start}, 'end' : {$lte : end}, 'species' : species}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, __v : false, homologies : {_id : false}});
			if(!genes_found){
				res = {error: 'Cannot find any gene in ' + start + '-' + end + 'interval for species ' + species};
			}
			else{
				res. genes = genes_found;
			}
		}
		return res;
	},

	get_compara_genomes: async (species1, species2) => {
		let genome1 = await models.species_model.findOne({'name' : species1}, {_id : false, __v : false});
		let genome2 = await models.species_model.findOne({'name' : species2}, {_id : false, __v : false});
		let res = {};
		if(!genome1){
			res = {error : 'Genome of species: ' + species + "doesn't exists"};
		}
		if(!genome2){
			let msg = 'Genome of species: ' + species2 + "doesn't exists";
			if(res.error){
				res.error = [msg, res.error];
			}
			else{
				res = {error : msg}
			}
		}
		if(!res.error){
			res.species1 = {}
			res.species1.name = genome1.name;
			res.species1.genes = [];
			res.species1.missing_genes = [];
			let gene_list = await models.genes_model.find({'species' : genome1.name, homologies : { $elemMatch : {target_species : species2}}}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, species : false, __v : false, homologies : {_id : false}});
			console.log(gene_list);
			for(let gene_id of genome1.genes){
				let gene_found = lodash.filter(gene_list, x => x.id === gene_id);
				gene_found = gene_found[0];
				if(!gene_found){
					res.species1.missing_genes.push(gene_id);
					insert_new_gene(gene_id, species1);
				}
				else{
					res.species1.genes.push(gene_found);
				}
			}
			if(res.species1.missing_genes.length){
				res.error = 'Missing genes will be uploaded shortly';
			}

			res.species2 = {}
			res.species2.name = genome2.name;
			res.species2.genes = [];
			res.species2.missing_genes = [];
			gene_list = await models.genes_model.find({'species' : genome2.name, homologies : {target_species : species1}}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, species : false, __v : false, homologies : {_id : false}});
			for(let gene_id of genome2.genes){
				let gene_found = lodash.filter(gene_list, x => x.id === gene_id);
				gene_found = gene_found[0];
				if(!gene_found){
					res.species2.missing_genes.push(gene_id);
					insert_new_gene(gene_id, species2);
				}
				else{
					res.species2.genes.push(gene_found);
				}
			}
			if(res.species2.missing_genes.length){
				res.error = 'Missing genes will be uploaded shortly';
			}

		
		
		
		}
	
		return res;	
	}

};
