const fs = require('fs');	// File system
const got = require('got');	// HTTP requests
const conn = require('./db_conn.js');
const shuffle = require('shuffle-array');
const GENE_LIST_LOCATION = './Gene_List/'		// Dir where biomart downloads are stored
const ENSEMBL_API = 'http://rest.ensembl.org/' 		// Site where we retrieve information
const FORMAT_JSON = ';content-type=application/json'	// Format API request in json

module.exports = {
	/*
	 * Processes the name of mart export file and returns the species it has info of.
	 * @param {string} name of mart export file.
	 * @return {string} the species of the mart export file
	 */
	get_species_from_mart_export: (file_name) => {
		let correct_name = file_name.split('.')[0]; 			// Delete txt extension
		correct_name = correct_name.split('_')[2];			// Delete mart_export
		return correct_name;
	},

	/*
	 * Retrieves from a biomart download the gene list.
	 * @param {string} the file to be read.
	 * @return {array} the strings of gene ids read.
	 */
	get_list_gene: (file_name) => {
		let file_data;
		try {
			file_data = fs.readFileSync(GENE_LIST_LOCATION + file_name, 'utf-8');
		} catch (err) {
			console.error(err);
		}
		if (file_data) {
			file_data = file_data.split('\n'); // Every ID has its line
			file_data.shift();		   // Delete first element (not a gene ID)
			file_data.pop();    		   // Delete last empty element
		}
		shuffle(file_data);
		return file_data;
	},

	/*
	 * Async function to request API Information
	 * @param {string} content of the request
	 * @return {???} the request
	 */
	ensembl_get: async (content) => {
		return await got(ENSEMBL_API + content + FORMAT_JSON);
	},

	get_gene_sequence: async (response) => {
		let json_seq = JSON.parse(response);
		return json_seq.seq;
	},
	/*
	 * Gets all the lists of genes ids downloaded from biomart
	 * @return {array} all the file names where the gene ids are stored
	 */
	get_all_lists: () => {
		let directory = fs.opendirSync(GENE_LIST_LOCATION);
		let ret = []
		let temp = directory.readSync();
		while(temp != null){
			ret.push(temp.name);
			temp = directory.readSync();
		}
		directory.close();
		return ret;
	},
	/*
	 * Processes gene data received from ensembl.
	 * @param {JSON} gene information from ensembl.
	 * @return {JSON} processed gene information.
	 */
	get_gene_info: (gene_information) => {
		let temp_json = JSON.parse(gene_information);
		let gene = {};
		gene.id = temp_json.id;
		gene.version = temp_json.version;
		gene.start = temp_json.start;
		gene.end = temp_json.end;
		gene.biotype = temp_json.biotype;
		gene.chromosome = temp_json.seq_region_name;
		gene.strand = temp_json.strand;
		gene.name = temp_json.species;
		gene.description = temp_json.description;
		return gene;
	},
	/*
	 * Processes homology data received from ensembl.
	 * @param {JSON} homology information from ensembl.
	 * @return {JSON} processed homology information.
	 */
	get_homologies: (homology_information) => {
		let temp_json = JSON.parse(homology_information);
		let homologies = [];
		for(let temp of temp_json.data[0].homologies){
			let homology = {};
			homology.target_id = temp.id;
			homology.target_species = temp.species;
			homologies.push(homology);
		}
		return homologies;
	}
};
