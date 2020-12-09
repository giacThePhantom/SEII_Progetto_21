const read = require('./read_data.js');
const write = require('./write_data.js');
const conn = require('./db_conn.js');





/*
 * Saves all the gene info
 */
async function build_gene_data(){
	let files = read.get_all_lists();
	for(let file of files){
		let arr = await write.write_gene_data(file);
	}
}

/*
 * Saves all species info
 */
async function build_species_data(){
	let files = read.get_all_lists();
	for(let file of files){
		let arr = await write.write_species_data(file);
		console.log('Wrote data for ' + file);
	}
}

/*
 * Start the program to save data from ensembl
 */
module.exports = {
	
	start: async () => {
		console.log('starting');
		console.log('created connection');
		//build_species_data();
		//build_gene_data();
	}
}

