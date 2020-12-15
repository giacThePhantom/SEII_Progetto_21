const process_new_gene_data = require('./write_data.js').write_new_gene_data;
const mongoose = require('mongoose');
const models = require('./models');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
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


async function get_all_genes(query, excludes, gene_id_list){
	let res = {};
	res.genes = [];
	let gene_list = await models.genes_model.find(query, excludes);
	res.genes = gene_list;
	if(gene_id_list.length > gene_list.lenght){
		res.error = "Missing genes, they will be updated shortly";
	}
	return res;
}

async function get_all_genes_aggregate(sort,unwind, match, project, gene_id_list){
	let res = {};
	res.genes = [];
	res.missing_genes = [];
	res.genes = await models.genes_model.aggregate([ unwind, match, project,sort]);
	/*for(let gene_id of gene_id_list){
		let gene_found = lodash.filter(gene_list, x => x.id === gene_id);
		gene_found = gene_found[0];
		if(!gene_found){
			res.missing_genes.push(gene_id);
			//insert_new_gene(gene_id, id);
		}
		else{
			res.genes.push(gene_found);
		}
	}*/
	if(res.missing_genes.length){
		res.error = 'Missing genes will be uploaded shortly';
	}
	return res;
}
async function count_species(){
	return await models.species_models.find().count();
}

async function homologies_for_species(name){
	let res = []
	let n_species = await count_species();
	for(let i = 0; i < n_species; i++){
		let temp = '"homologies.' + i + '.target_species"';
		res.push({temp : target_species});
	}
	return res;

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


	insert_search:async(user_info,search_info)=>{
		let ret={errore:"errore"};
		if(user_info && user_info.token){
		console.log(user_info,search_info,user_info.self);
		jwt.verify(user_info.token,"Group21KEY",async  function(err, decoded) {
			if (!err && decoded.email==user_info.email) {
				let id=user_info.self.substring(user_info.self.lastIndexOf("/")+1);
				console.log(user_info.email,id);
				ret=await models.users_model.updateOne({email:user_info.email, id:id},{$push:{history:search_info}});
			}
			else{
				console.log("errore token");
			}
		});
	}
		return ret;
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
		let species_found = await models.species_model.find({}, {genes : false, _id : false, __v : false});
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
		let sequence = await models.genes_model.findOne({'id' : id}, {_id : false, __v : false, id : false, species : false, version : false, start : false, end : false, biotype : false, chromosome : false, strand : false, description : false, homologies : false, gene_tree : false});
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
			res = await get_all_genes({'species' : genome.name}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, species : false, __v : false, 'homologies._id' : false}, genome.genes);
			res.name = genome.name;
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
			let genes_found = await models.genes_model.find({'start' : {$gte : start}, 'end' : {$lte : end}, 'species' : species}, {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, __v : false, 'homologies._id' : false});
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
			res = {error : 'Genome of species: ' + species1 +  " doesn't exists"};
		}
		if(!genome2){
			let msg = 'Genome of species: ' + species2 + " doesn't exists";
			if(res.error){
				res.error = [msg, res.error];
			}
			else{
				res = {error : msg}
			}
		}
		if(!res.error){
			res.species1 = await get_all_genes_aggregate({$sort:{start:1}},{$unwind : {path: '$homologies'}}, {$match : {'homologies.target_species' : genome2.name, species : genome1.name}},
			 {$project : {
				 _id : false,
				 end:false,
				 strand:false,
				 sequence : false,
				 version : false,
				 biotype : false,
				 description : false,
				 gene_tree : false,
				 species : false,
				 __v : false,
				 'homologies._id' : false,
				 'homologies.target_species' : false}},
				  genome1.genes);
			res.species1.name = genome1.name;
		}

		return res;
	},

	get_compara_chr: async (species1, species2, chr) => {
		let genome1 = await models.species_model.findOne({'name' : species1}, {_id : false, __v : false});
		let genome2 = await models.species_model.findOne({'name' : species2}, {_id : false, __v : false});
		let res = {};
		if(!genome1){
			res = {error : 'Genome of species: ' + species1 + " doesn't exists"};
		}
		if(!genome2){
			let msg = 'Genome of species: ' + species2 + " doesn't exists";
			if(res.error){
				res.error = [msg, res.error];
			}
			else{
				res = {error : msg}
			}
		}
		if(!res.error){
			res.species1 = await get_all_genes_aggregate({$sort : {start:1}}, {
					$unwind : {
						path: '$homologies'
					}
				}, 
				{
					$match : {
						'homologies.target_species' : genome2.name, 
						species : genome1.name, 
						chromosome : chr
					}
				}, 
				{
					$project : {
						_id : false, 
						sequence : false, 
						version : false, 
						biotype : false, 
						description : false, 
						gene_tree : false, 
						species : false, __v : false, 
						'homologies._id' : false
					}
				}, 
				genome1.genes
			);
			res.species1.name = genome1.name;
			if(!res.species1.genes.length){
				res = {};
				res.error = "Chromosome: " + chr + " doesn't exists";
			}

		//	res.species2 = await get_all_genes_aggregate({$unwind : {path: '$homologies'}}, {$match : {'homologies.target_species' : genome1.name, species : genome2.name, chromosome : chr}}, {$project : {_id : false, sequence : false, version : false, biotype : false, description : false, gene_tree : false, species : false, __v : false, 'homologies._id' : false}}, genome1.genes);
			//res.species2.name = genome2.name;




		}

		return res;
	}


};
