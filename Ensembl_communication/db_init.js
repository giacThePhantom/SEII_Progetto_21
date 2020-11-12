const read = require('./read_data.js');
const write = require('./write_data.js');


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
