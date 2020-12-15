const read = require('./read_data.js');
const write = require('./write_data.js');
const conn = require('./db_conn.js');
const update = require('./update_data.js');

async function albero_prova(){
	let testtree = await write.tree_prova('ENSG00000157764');
	//console.log(JSON.stringify(testtree));
}


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
	//console.log(files);
	for(let file of files){
		//console.log('Writing data for ' + file);
		let arr = await write.write_species_data(file);
		//console.log('Wrote data for ' + file);
	}
}

/*
 * Start the program to save data from ensembl
 */
module.exports = {

	start: async () => {
		//console.log('starting');
		//console.log('created connection');
		await build_species_data();
		//console.log('Written all species data');
		build_gene_data();
		while (true) {
			conn.update.update_all_genes();
		}
	}

}
