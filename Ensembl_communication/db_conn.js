const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/';

/*
 * Starts a mongodb client,
 * @param {MongoClient} Client to start.
 */
async function run(client){
    	// Connect the client to the server
    	await client.connect();
    	// Establish and verify connection
    	await client.db("admin").command({ ping: 1 });
    	console.log("Connected successfully to server");
  	
}

/* Prints a log message
 * @param {Object} error value.
 * @param {Object} success value.
 * @param {String} Message to print.
 */
function log(err, res, msg){
	console.log(msg);
	if(err) throw err;
	console.log(msg);
}

/* See if gene is present in genes_info.
 * @param {String} Ensembl stable ID.
 * @return {Boolean} True if present, false otherwise.
 */
async function gene_alredy_saved(db_genes, gene_info){
	let data = await db_genes.collection('genes_info').findOne({'id': gene_info.id});
	let res;
	if(data){
		res = true;
	}
	else{
		res = false;
	}
	return res;
}

/* See if homology is present in genes_homology.
 * @param {String} Ensembl stable ID of gene.
 * @param {String} Ensembl stable ID of homologue.
 * @return {Boolean} True if present, false otherwise.
 */
async function homology_alredy_saved(db_genes, homology_info){
	let data = await db_genes.collection('genes_homology').findOne({ $and: [{'id': homology_info.id}, {'target_id': homology_info.target_id}]});
	let res;
	if(data){
		res = true;
	}
	else{
		res = false;
	}
	return res;
}

module.exports = {
	/* Creates a MongoClient
	 * @return {MongoClient} client to return
	 */
	connect: async () => {
		let uri_final = uri + '?useUnifiedTopology=true';
		const client = new MongoClient(uri_final);
		await run(client).catch(console.dir);
		return client;
	},
	/* Creates genes db.
	 * @param {MongoClient} where to create the db.
	 * @return {Db} the db created.
	 */
	init_db: async (client) => {
		let db_genes = client.db('genes');
		await db_genes.createCollection('genes_info', (err, res) => log(err, res, 'created genes_info'));
		await db_genes.createCollection('genes_homology', (err, res) => log(err, res, 'created genes_homology'));
		return db_genes;
	},

	/* Closes the mongo client.
	 * @param {MongoClient} Client to close.
	 */
	close: async (client) => {
		await client.close((err, res) => {log(err, res, 'Closing db connection')});
	},
	
	/* Deletes genes db.
	 * @param {MongoClient} where to delete the db.
	 */
	del_db: async (client) => {
		let db_genes = client.db('genes');
		return new Promise(async function(resolve, reject){
			await db_genes.collection('genes_info').drop((err, delOK) => log(err, delOK, 'deleted genes_info'));
			await db_genes.collection('genes_homology').drop((err, delOK) => log(err, delOK, 'deleted genes_homology'));
			resolve('true');
		});
	},
		

	/* Inserts gene in db
	 * @param {Db} Where the data is stored.
	 * @param{Object} Data to be stored.
	 */
	insert_gene: async (db_genes, gene_info) => {
		let to_be_saved = !(await gene_alredy_saved(db_genes, gene_info));
		if(to_be_saved){
			await db_genes.collection('genes_info').insertOne(gene_info, (err, res) => log(err, res, '1 info inserted'));
		}
		
	},
	
	/* Inserts gene homology in db
	 * @param {Db} Where the data is stored.
	 * @param{Object} Data to be stored.
	 */
	insert_homology: async (db_genes, gene_homology) => {
		let to_be_saved = !(await homology_alredy_saved(db_genes, gene_homology));
		if(to_be_saved){
			await db_genes.collection('genes_homology').insertOne(gene_homology, (err, res) => log(err, res, '1 homology inserted'));
		}
	}

}




