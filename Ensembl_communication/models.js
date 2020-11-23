const mongoose = require('mongoose')

const { Schema } = mongoose;

const gene = new Schema({
	id: String,
	version: Number,
	start: Number,
	end: Number, 
	biotype: String,
	chromosome: String,
	strand: Number, 
	name: String,
	description: String,
	sequence: String,
	homologies: [{
		target_id: String,
		target_species: String
	}],
	gene_tree: String
});


const gene_tree = new Schema({
	id: String,
	children: [{
		scientific_name: String,
		children: [{}]
	}]
});





module.exports = {
	genes_model: mongoose.model('gene_info', gene),
	gene_trees: mongoose.model('gene_tree', gene_tree)
}

