const mongoose = require('mongoose');
const models = require('./models');
const uri = 'mongodb://127.0.0.1:27017/genes';


/* Prints a log message
 * @param {Object} error value.
 * @param {Object} success value.
 * @param {String} Message to print.
 */
function log(err, res, msg){
	if(err) throw err;
}

/* See if gene is present in genes_info.
 * @param {mongoose.model} Model of the genes_info collection.
 * @param {Object} Information of a gene.
 * @return {Boolean} True if present, false otherwise.
 */
async function id_already_saved(model, object_info){
	let data = await model.find({'id': object_info.id});
	let res;
	if(data.length > 0){
		res = true;
	}
	else{
		res = false;
	}
	return res;
}

/* See if species is present in species.
 * @param {mongoose.model} Model of the species collection.
 * @param {Object} Information of a species.
 * @return {Boolean} True if present, false otherwise.
 */
async function species_already_saved(model, species_info){
	let data = await model.find({'name': species_info.name});
	let res;
	if(data.length > 0){
		res = true;
	}
	else{
		res = false;
	}
	return res;
}



module.exports = {
	/* Inserts gene in db
	 * @param {Object} Data to be stored.
	 * @return {Boolean} If the data has been stored.
	 */
	insert_gene: async (gene_info) => {
		let to_be_saved = !(await id_already_saved(models.genes_model, gene_info));
		if(to_be_saved){
			let to_be_inserted = new models.genes_model(gene_info);
			await to_be_inserted.save((err) => {log(err, 'Inserted correctly', 'Inserted gene info');});
		}
		return to_be_saved;

	},
	insert_tree: async (tree_info) => {
		let to_be_saved = !(await id_already_saved(models.trees_model, tree_info));
		if(to_be_saved){
			let to_be_inserted = new models.trees_model(tree_info);
			await to_be_inserted.save((err) => {log(err, 'Inserted correctly', 'Inserted tree info');});
		}else {
			console.log("tree already saved: "+tree_info.id);
		}
		return to_be_saved;
	},
	/* Inserts species in db
	 * @param {Object} Data to be stored.
	 * @return {Boolean} If the data has been stored
	 */
	insert_species: async (species_info) => {
		let to_be_saved = !(await species_already_saved(models.species_model, species_info));
		if(to_be_saved){
			let to_be_inserted = new models.species_model(species_info);
			await to_be_inserted.save((err) => {log(err, 'Inserted correctly', 'Inserted species info');});
		}
		return to_be_saved;
	},

	get_gene_info: async (id, filters) => {
		let gene_found;
		if(filters.format == 'condensed'){
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : false});
		}
		else{
			gene_found = await models.genes_model.findOne({'id' : id}, {_id : false});
		}
		let res;
		if(!gene_found){
			res = {error : "Cannot find gene " + id};
		}
		else{
			res = gene_found;
		}
		return res;
	},
	get_sequence_of_gene: async (id) => {
		let sequence = await models.genes_model.findOne({'id' : id}, {_id : false, sequence : true});
		let res;
		if(!sequence){
			res = {error : 'Gene ' + id + " doesn't exists"};
		}
		else{
			res = sequence;
		}
		return res;
	}
}
