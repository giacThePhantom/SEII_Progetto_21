//const got = require('got');	// HTTP requests
const fs = require('fs');	// File system
const read = require('./read_data.js');

const ENSEMBL_API = 'http://rest.ensembl.org/' 		// Site where we retrieve information
const FORMAT_JSON = '?content-type=application/json'	// Format API request in json
const GENE_LIST_LOCATION = './Gene_List/'		// Dir where biomart downloads are stored
const JSON_LOCATION = './Jsons/'			// ? Temporary store elaborated info, will be replaced by db

/*
 * Processes the name of mart export file and returns the species it has info of.
 * @param {string} name of mart export file.
 * @return {string} the species of the mart export file
 */

/*
 * Creates the json file to store data TEMPORARY!!!
 * @param {string} name of file where ids are stored
 * @return {string} name of new file
 */
function create_file(file_name){
	let correct_name = read.get_species_from_mart_export(file_name);
	correct_name += '.json';					// Add json extension
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
function write_gene_to_file(file_name, gene, index) {
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

/*
 * Processes and saves in an array the information retrieved from ensembl
 * @param {JSON} gene information from ensembl.
 * @param {array} array to which the processed gene information is pushed
 */
function save_gene(gene_information, gene_array) {
	let temp_json = JSON.parse(gene_information);
	let gene = {};
	gene.id = temp_json.id;
	gene.version = temp_json.version;
	gene.start = temp_json.start;
	gene.end = temp_json.end;
	gene.biotype = temp_json.biotype;
	gene.chromosome = temp_json.seq_region_name;
	gene.strand = temp_json.strand;
	gene.name = temp_json.logic_name;
	gene.description = temp_json.description;
	gene_array.push(gene);
	console.log(gene);
}

/*
 * Takes the file of gene ids, gets their information and saves them (now in JSON, in the end in DB)
 * @param {string} the name of the file containing the list of ids
 */
async function write_gene_data(list_gene_file) {
	let file_to_save = read.create_file(list_gene_file);		//TEMPORARY!!!
	let gene_array = [];
	let gene_IDS = read.get_list_gene(list_gene_file);
	return new Promise(async function(resolve, reject){
		for (let gene of gene_IDS) {
			await read.ensembl_get('lookup/id/' + gene).then((ret) => {
				save_gene(ret.body, gene_array);
				let last = gene_array.length - 1;				//TEMPORARY!!!
				write_gene_to_file(file_to_save, gene_array[last], last); 	//TEMPORARY!!!
			}
			);
		}
		resolve(gene_array); //resolve with value
	});
}


async function write_homology_info(list_gene_file) {
	console.log('TO DO');
}







/*
 * Prints all genes IDs
 */
function print_genes(){
	console.log('Getting all IDs:');
	let files = read.get_all_lists();
	for(let file of files){
		let species = read.get_species_from_mart_export(file);
		console.log('IDs of species ' + species + ":");
		let ids = read.get_list_gene(file);
		for(let i = 0; i < ids.length; i++){
			process.stdout.write('\t' + ids[i]);
			if(i % 4 == 0 && i != 0){
				process.stdout.write('\n')
			}
		}
		console.log('');
	}
}


/*
 * Saves all the gene info (now in JSONs, at the end in DB)
 */
async function build_gene_data(){
	let files = read.get_all_lists();
	for(let file of files){
		console.log('Reading from: ' + file);
		let arr = await write_gene_data(file);
		console.log(arr);
	}
}

/*
 * Saves all gene homology info (now in JSONs, at the end in DB)
 */
async function build_homology(){
	let files = get_all_lists();
	for(let file of files){
		console.log('Reading from: ' + file);
		let arr = await write_homology_info(file);
		console.log(arr);
	}

}



/*
 * Start the program to save data from ensembl
 */
async function start(){
	let my_args = process.argv.slice(2);
	if(my_args.length == 0){
		console.error('Missing arguments!');
	}
	else{
		for(let arg of my_args){
			switch(arg){
				case 'print_genes':
					print_genes();
					break;
				case 'build_genes_info':
					build_gene_data();
					break;
				case 'build_homology':
					build_homology();
					break;
				default:
					console.error('Cannot recognise option: ' + arg);
			}
		}
	}
}


start();
