const mongoose = require('mongoose')

const { Schema } = mongoose;

/*
 * Schema of species
 */
const species = new Schema({
	name: String, 
	genes: [String]
})

/*
 * Schema of genes
 */
const gene = new Schema({
	id: String,
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
	children: [{
		scientific_name: String,
		children: [{}]
	}]
});





module.exports = {
	genes_model: mongoose.model('gene_info', gene),
	gene_trees: mongoose.model('gene_tree', gene_tree),
	species_model: mongoose.model('species', species)
}

