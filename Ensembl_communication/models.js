const mongoose = require('mongoose')

const { Schema } = mongoose;


mongoose.set('useCreateIndex', true); //avoids deprecation error for mongodb

/*
 * Schema of species
 */
const species = new Schema({
	name: {
		type : String,
		unique : true
	},
	genes: [String]
})

/*
 * Schema of genes
 */
const gene = new Schema({
	id: {
		type : String,
		unique : true
	},
	species: String,
	version: Number,
	start: Number,
	end: Number,
	biotype: String,
	chromosome: String,
	strand: Number,
	description: String,
	sequence: String,
	homologies: [{
		target_id: String,
		target_species: String
	}],
	gene_tree: String
});

/*
 * Schema of gene tree
 */
const gene_tree = new Schema({
	id: String,
	root_species: String,
	children:[]
});
/*
 * Schema of user
 */
const user= new Schema({
	id: String,
	email: String,
	username: String,
	password: String,
	admin: Boolean,
	history:[String],
	uploadedGenes:[{
			usergeneid:String,
			approved: Boolean
		}]
});

/*
 * Schema of Q&A
 */
const qanda= new Schema({
	questionAuthor: String,
	answerAuthor: String,
	questionText: String,
	answerText: String
});

module.exports = {
	genes_model: mongoose.model('gene_info', gene),
	trees_model: mongoose.model('gene_tree', gene_tree),
	species_model: mongoose.model('species', species),
	users_model: mongoose.model('user',user),
	qandas_model:mongoose.model('qanda',qanda)
}
