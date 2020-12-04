const read = require('./read_data.js');
const fs = require('fs');	// File system
const conn = require('./db_conn.js');

/* 
 * Excludes from the list of species the one selected.
 * @param {String} the species to be excluded.
 * @return {Array} All the other species.
 */
function get_other_species(species){
	species = read.get_species_from_mart_export(species);
	let ret = read.get_all_lists();
	for(let i = 0; i < ret.length; i++){
		ret[i] = read.get_species_from_mart_export(ret[i]); 
	}
	return ret.filter((value, index, arr) =>{
		return value != species;
	});

}

/* Processes the gene data from the id.
 * @param {String} gene ensembl id.
 * @param {Array} the list of other species.
 * @return {Object} the object gene to be inserted in the database
 */
async function process_gene_data(gene_id, species_list){
	let response = await read.ensembl_get('lookup/id/' + gene_id + '?');
	let to_be_inserted = read.get_gene_info(response.body);
	let sequence_response = await read.ensembl_get('sequence/id/' + to_be_inserted.id + '?');
	to_be_inserted.sequence = read.get_gene_sequence(sequence_response.body);
	to_be_inserted.homologies = [];
	for(let species of species_list){
		let homologies_response = await read.ensembl_get('homology/id/' + to_be_inserted.id + '?target_species=' + species + ';format=condensed');
		let homology = read.get_homologies(homologies_response.body);
		if(homology.length){
			to_be_inserted.homologies.push(...read.get_homologies(homologies_response.body));
		}
	}

	let tree_response = await read.ensembl_get('genetree/member/id/' + gene_id + '?sequence=none');
	if(tree_response){
		to_be_inserted.gene_tree = read.get_gene_tree(tree_response.body);
		console.log('Tree to be inserted');
		console.log(to_be_inserted.gene_tree);
		console.log(to_be_inserted.gene_tree.children[1].children);
	}
	return to_be_inserted;
}



module.exports = {
	tree_prova: async function process_gene_data_tree(gene_id){
		let tree_response = await read.ensembl_get('genetree/member/id/' + gene_id + '?sequence=none');
			if(tree_response){
				tree_risp = read.get_gene_tree(tree_response.body);
				console.log('Tree to be inserted');
				//console.log(to_be_inserted.gene_tree);
				//console.log(to_be_inserted.gene_tree.children[1].children);
			}
			return tree_risp;
		},
	/*
	 * Takes the file of gene ids, gets their information and saves them in the database 
	 * @param {string} the name of the file containing the list of ids
	 * @return {Array} the array of the genes saved
	 */
	write_gene_data: async (list_gene_file) => {
		let gene_array = [];
		let gene_IDS = read.get_list_gene(list_gene_file);
		let species_array = get_other_species(list_gene_file);
		return new Promise(async function(resolve, reject){
			for (let gene of gene_IDS) {
				let to_be_inserted = await process_gene_data(gene, species_array);
				await conn.insert_gene(to_be_inserted);
				gene_array.push(to_be_inserted);
			}
			resolve(gene_array); //resolve with value
		});
	},
	/*
	 * Takes the file of gene ids for a species and save the species information in the database
	 * @param {string} the name of the file containing the list of ids
	 */
	write_species_data: async (list_gene_file) => {
		let gene_IDS = read.get_list_gene(list_gene_file);
		let name = read.get_species_from_mart_export(list_gene_file);
		return new Promise(async (resolve, reject) => {
			let to_be_inserted = {}
			to_be_inserted.name = name;
			to_be_inserted.genes = gene_IDS
			await conn.insert_species(to_be_inserted);
		
		});
	}
}
