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
	if(err) throw err;
	console.log(msg);
}

module.exports = {
	/* Creates a MongoClient
	 * @return {MongoClient} client to return
	 */
	connect: () => {
		let uri_final = uri + '?useUnifiedTopology=true';
		const client = new MongoClient(uri_final);
		run(client).catch(console.dir);
		return client;
	},
	/* Creates genes db.
	 * @param {MongoClient} where to create the db.
	 * @return {Db} the db created.
	 */
	init_db: async (client) => {
		let db_genes = client.db('genes');
		db_genes.createCollection('genes_info', (err, res) => log(err, res, 'created genes_info'));
		db_genes.createCollection('genes_homology', (err, res) => log(err, res, 'created genes_homology'));
		return db_genes;
	},

	/* Closes the mongo client.
	 * @param {MongoClient} Client to close.
	 */
	close: async (client) => {
		//await client.close();
	},
	
	/* Deletes genes db.
	 * @param {MongoClient} where to delete the db.
	 */
	del_db: async (client) => {
		let db_genes = client.db('genes');
		db_genes.collection('genes_info').drop((err, delOK) => log(err, delOK, 'deleted genes_info'));
		db_genes.collection('genes_homology').drop((err, delOK) => log(err, delOK, 'delete genes_homology'));
	},
		

	/* Inserts gene in db
	 * @param {Db} Where the data is stored.
	 * @param{Object} Data to be stored.
	 */
	insert_gene: async (db_genes, gene_info) => {
		db_genes.collection('genes_info').insertOne(gene_info, (err, res) => log(err, res, '1 info inserted'));
		
	},
	
	/* Inserts gene homology in db
	 * @param {Db} Where the data is stored.
	 * @param{Object} Data to be stored.
	 */
	insert_homology: async (db_genes, gene_homology) => {
		db_genes.collection('genes_homology').insertOne(gene_homology, (err, res) => log(err, res, '1 homology inserted'));
	}


}




