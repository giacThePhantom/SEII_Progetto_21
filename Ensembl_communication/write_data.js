const read = require('./read_data.js');
const fs = require('fs');	// File system

const JSON_LOCATION = './Jsons/'			// ? Temporary store elaborated info, will be replaced by db

/*
 * Creates the json file to store data TEMPORARY!!!
 * @param {string} name of file where ids are stored
 * @return {string} name of new file
 */
function create_file(file_name){
	let correct_name = file_name += '.json';					// Add json extension
	fs.writeFile(JSON_LOCATION + correct_name, '[\n', (err) => {
		if (err) throw err;
	});
	return correct_name;
}

/*
 * Writes the processed gene information to the json file TEMPORARY!!!
 * @param {string} name of json file
 * @param {JSON} gene json object
 * @param {number} index of gene to be inserted
 */
function write_json_to_file(file_name, gene, index){
	if(index != 0){		//if it's not the first gene add ',' for JSON array
		fs.appendFile(JSON_LOCATION + file_name, ',\n', (err) => {
			if (err) throw err;
		});
	}
	fs.appendFile(JSON_LOCATION + file_name, JSON.stringify(gene, null, 2) , (err) =>{
		if (err) throw err;
	});
}

/*
 * Closes the json file giving the correct syntax
 * @param {string} json file name.
 */
function close_file(file_name){
	fs.appendFile(JSON_LOCATION + file_name, '\n]', (err) =>{
		if (err) throw err;
	});
}


module.exports = {
	/*
	 * Takes the file of gene ids, gets their information and saves them (now in JSON, in the end in DB)
	 * @param {string} the name of the file containing the list of ids
	 */
	write_gene_data: async (list_gene_file) => {
		let file_to_save = read.get_species_from_mart_export(list_gene_file);
		file_to_save = create_file(file_to_save);		//TEMPORARY!!!
		let gene_array = [];
		let gene_IDS = read.get_list_gene(list_gene_file);
		return new Promise(async function(resolve, reject){
			for (let gene of gene_IDS) {
				await read.ensembl_get('lookup/id/' + gene + '?').then((ret) => {
					let gene = read.get_gene_info(ret.body);
					write_json_to_file(file_to_save, gene, gene_array.length); 	//TEMPORARY!!!
					gene_array.push(gene);
				}
				);
			}
			resolve(gene_array); //resolve with value
		});
	},
	
	write_homology_data: async (file_name) => {
		console.log('in write homology data');
		let specie_name = read.get_species_from_mart_export(file_name);
		let file_to_save = specie_name + '_homologies';
		file_to_save = create_file(file_to_save);
		let homology_array = [];
		let gene_IDS = read.get_list_gene(file_name);
		return new Promise(async function(resolve, reject){
			for (let gene of gene_IDS) {
				let species = read.get_all_lists();
				for(let specie of species){
					specie = read.get_species_from_mart_export(specie); 
					if(specie != specie_name){
						await read.ensembl_get('homology/id/' + gene + '?' + 'target_species=' + specie).then((ret) => {
							let homologies = read.get_homology_info(ret.body);
							for(let homology of homologies){
								write_json_to_file(file_to_save, homology, homology_array.length); 	//TEMPORARY!!!
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
