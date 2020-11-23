const read = require('./read_data.js');
const write = require('./write_data.js');
const conn = require('./db_conn.js');

const mongoose = require('mongoose'); //temporary

const uri = 'mongodb://127.0.0.1:27017/genes';
/*
 * Prints all genes IDs
 */

// TEMPORARYYYYYYYYYYYYYYY
async function run(){
    	// Connect the client to the server
    	//await client.connect();
    	// Establish and verify connection
    	//await client.db("admin").command({ ping: 1 });
    	let client = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	console.log("Connected successfully to server");
	return client;
  	
}


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
		let arr = await write.write_gene_data(file);
		console.log(arr);
	}
}

/*
 * Saves all gene homology info (now in JSONs, at the end in DB)
 */
async function build_homology(){
	let files = read.get_all_lists();
	for(let file of files){
		console.log('Reading from: ' + file);
		let arr = await write.write_homology_data(file);
		console.log(arr);
	}

}

/* 
 * Creates the collection for database genes
 */


async function build_db(connection){
	console.log('Connected');
	await conn.init_db();
	console.log('Finished creating schemas, ending');
}

async function drop_db(){
	let mongo_client = run();
	await conn.del_db(mongo_client);
	conn.close(mongo_client);
}



/*
 * Start the program to save data from ensembl
 */
async function start(connection){
	connection = run(); //TEMPORARY
	build_bd(connection);

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
					await build_gene_data();
					break;
				case 'build_homology':
					await build_homology();
					break;
				case 'build_db':
					await build_db();
					break;
				case 'drop_db':
					await drop_db();
					break;
				default:
					console.error('Cannot recognise option: ' + arg);
			}
		}
	}
}


start();
