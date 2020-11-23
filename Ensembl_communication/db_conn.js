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
	console.log(msg);
}

/* See if gene is present in genes_info.
 * @param {String} Ensembl stable ID.
 * @return {Boolean} True if present, false otherwise.
 */
async function gene_alredy_saved(model, gene_info){
	let data = await model.find({'id': gene_info.id});
	console.log(data);
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
	 * @param {Db} Where the data is stored.
	 * @param{Object} Data to be stored.
	 */
	insert_gene: async (gene_info) => {
		let to_be_saved = !(await gene_alredy_saved(models.genes_model, gene_info));
		if(to_be_saved){
			console.log('Going to insert a gene');
			let to_be_inserted = new models.genes_model(gene_info);
			console.log(to_be_inserted);
			await to_be_inserted.save((err) => {log(err, 'Inserted correctly', 'Inserted gene info');});
			console.log('Inserted');
		}
		return to_be_saved;
		
	}

}




