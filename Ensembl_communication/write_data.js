const read = require('./read_data.js');
const fs = require('fs');	// File system
const conn = require('./db_conn.js');


module.exports = {
	/*
	 * Takes the file of gene ids, gets their information and saves them (now in JSON, in the end in DB)
	 * @param {string} the name of the file containing the list of ids
	 */
	write_gene_data: async (list_gene_file) => {
		let gene_array = [];
		let gene_IDS = read.get_list_gene(list_gene_file);
		let genes_db = conn.connect().db('genes');
		return new Promise(async function(resolve, reject){
			for (let gene of gene_IDS) {
				await read.ensembl_get('lookup/id/' + gene + '?').then((ret) => {
					let gene = read.get_gene_info(ret.body);
					conn.insert_gene(genes_db, gene);
					gene_array.push(gene);
				}
				);
			}
			resolve(gene_array); //resolve with value
		});
	},
	
	/*
	 * Takes the file of gene ids, gets their homologues and saves them (now in JSON, in the end in DB)
	 * @param {string} the name of the file containing the list of ids
	 */
	write_homology_data: async (file_name) => {
		let specie_name = read.get_species_from_mart_export(file_name);
		let homology_array = [];
		let gene_IDS = read.get_list_gene(file_name);
		let homology_db = conn.connect().db('genes');
		return new Promise(async function(resolve, reject){
			let species = read.get_all_lists();
			for(let i = 0; i < species.length; i++){
				species[i] = read.get_species_from_mart_export(species[i]); 
			}
			for (let gene of gene_IDS) {
				for(let specie of species){
					if(specie != specie_name){
						await read.ensembl_get('homology/id/' + gene + '?' + 'target_species=' + specie + ';format=condensed').then((ret) => {
							let homologies = read.get_homology_info(ret.body);
							for(let homology of homologies){
								conn.insert_homology(homology_db, homology);
								homology_array.push(homology);
							}
						});
					}
				}
			}
			resolve(homology_array); //resolve with value
		});
	
	}
};
