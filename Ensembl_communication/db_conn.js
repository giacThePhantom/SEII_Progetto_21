const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/';


async function run(client){
	try {
    	// Connect the client to the server
    	await client.connect();
    	// Establish and verify connection
    	await client.db("admin").command({ ping: 1 });
    	console.log("Connected successfully to server");
  	} finally {
		await client.close();
	} 
}



module.exports{

	connect: () => {
		let uri_final = uri + '?useUnifiedTopology=true';
		const client = new MongoClient(uri_final);
		run(client).catch(console.dir);
		return client;
	},
	
	init_db: async (client) => {
		let db_genes = client.db('genes');
		db_genes.createCollection('genes_info');
		db_genes.createCollection('genes_homology');
		return db_genes;
	},

	insert_gene: async (db_genes, gene_info) => {
		db_genes.collection('genes_info').insertOne(gene_info, (err, res) => {
			if (err) throw err;
			console.log('1 info inserted');
		}
		);
	}
	
	insert_homology: async (db_genes, gene_homology) => {
		db_genes.collection('genes_homology').insertOne(gene_homology, (err, res) => {
			if (err) throw err;
			console.log('1 info inserted');
		}
		);
	}


}




