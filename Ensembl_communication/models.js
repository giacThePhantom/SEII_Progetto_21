const mongoose = require('mongoose')

const { Schema } = mongoose;

const gene_schema = new Schema({
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
		target_id: String
	}],
	gene_tree: String
});


const gene_tree = new Schema({
	id: String,
	children: [{
		scientific_name: String.
		children: [{}]
	}]
});





module.exports = {
	mongoose.model('gene_info', gene_schema),

	mongoose.model('gene_tree', gene_homology),
}

