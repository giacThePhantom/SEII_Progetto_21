const fs = require('fs');	// File system
const got = require('got');	// HTTP requests
const conn = require('./db_conn.js');
const shuffle = require('shuffle-array');
const GENE_LIST_LOCATION = './Ensembl_communication/Gene_List/'		// Dir where biomart downloads are stored
const ENSEMBL_API = 'http://rest.ensembl.org/' 		// Site where we retrieve information
const FORMAT_JSON = ';content-type=application/json'	// Format API request in json

/*
 * Internal function to process data in gene tree
 *
 */
function get_gene_tree_rec(children_array){
	let children_response =[];
	if(children_array){
		for(let child of children_array){
			let child_body={'root_species': child.taxonomy.scientific_name};
			child_body.children=get_gene_tree_rec(child.children);
			children_response.push(child_body);
		}
	}
	return children_response;
}

module.exports = {
	/*
	 * Processes the name of mart export file and returns the species it has info of.
	 * @param {string} name of mart export file.
	 * @return {string} the species of the mart export file
	 */
	get_species_from_mart_export: (file_name) => {
		let correct_name = file_name.split('.')[0]; 			// Delete txt extension
		correct_name = correct_name.split('_')[2]+"_"+correct_name.split('_')[3];			// Delete mart_export
		return correct_name;
	},

	/*
	 * Retrieves from a biomart download the gene list.
	 * @param {string} the file to be read.
	 * @return {array} the strings of gene ids read.
	 */
	get_list_gene: (file_name) => {
		let file_data = [];
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
		return file_data;
	},

	/*
	 * Async function to request API Information.
	 * @param {String} content of the request.
	 * @return {String} the request.
	 */
	ensembl_get: async (content) => {
		return await got(ENSEMBL_API + content.replace("\r","") + FORMAT_JSON).catch((err) => {
			if(err.response.statusCode >= 400  ){
				//console.log('Could not find ' + ENSEMBL_API + content + FORMAT_JSON);
			}
			else throw err;
		});
	},

	/* Async function to process sequence information.
	 * @param {String} content of the request.
	 * @param {String} the sequence.
	 */
	get_gene_sequence: (response) => {
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
				////////////////// portion of code added only during debug: prevents useless downloads of data
			if(temp.name.endsWith("txt"))
			//////////////////////
			ret.push(temp.name);
			temp = directory.readSync();
		}
		directory.close();
		return ret;
	},

	/*
	 * Processes gene data received from ensembl.
	 * @param {String} gene information from ensembl.
	 * @return {Object} processed gene information.
	 */
	get_gene_info: (gene_information) => {
		let temp_json = JSON.parse(gene_information);
		let gene = {};
		//console.log("getting gene "+temp_json.id);
		gene.id = temp_json.id;
		gene.species=temp_json.species,
		gene.version = temp_json.version;
		gene.start = temp_json.start;
		gene.end = temp_json.end;
		gene.biotype = temp_json.biotype;
		gene.chromosome = temp_json.seq_region_name;
		gene.strand = temp_json.strand;
		gene.description = temp_json.description;
		return gene;
	},

	/*
	 * Processes homology data received from ensembl.
	 * @param {String} homology information from ensembl.
	 * @return {Array} processed homology information.
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
	},

	/*
	 * Processes gene tree data received from ensembl.
	 * @param {String} gene tree information from ensembl.
	 * @return {Array} processed homology information.
	 */
	get_gene_tree: (response) => {
		let response_json = JSON.parse(response);
		let data = {};
		data.id = response_json.id;
		data.root_species = response_json.tree.taxonomy.scientific_name;
		try{
			data.children = get_gene_tree_rec(response_json.tree.children);
		}catch{
			//console.log(data.id+" depth greater than 50");
			data.id="_"+data.id;
		}

		//inserimento nel database
		return data;
	}


};
