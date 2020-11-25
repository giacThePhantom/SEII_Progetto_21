const read = require('./read_data.js');
const write = require('./write_data.js');
const conn = require('./db_conn.js');

const mongoose = require('mongoose'); //temporary

const uri = 'mongodb://127.0.0.1:27017/genes';

// TEMPORARYYYYYYYYYYYYYYY
async function run(){
    	let client = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	console.log("Connected successfully to server");
	return client;
  	
}




/*
 * Saves all the gene info (now in JSONs, at the end in DB)
 */
async function build_gene_data(){
	let files = read.get_all_lists();
	for(let file of files){
		console.log('Reading from: ' + file);
		let arr = await write.write_gene_data(file);
		console.log(arr);
	}
}


async function build_species_data(){
	let files = read.get_all_lists();
	for(let file of files){
		console.log('Reading from: ' + file);
		let arr = await write.write_species_data(file);
		console.log(arr);
	}
}

/*
 * Start the program to save data from ensembl
 */
module.exports = {
	
	start: async () => {
		console.log('starting');
		//connection = run(); //TEMPORARY
		console.log('created connection');
		build_species_data();
		//build_gene_data();
	}
}

