const mongoose=require("mongoose");
const conn = require('../Ensembl_communication/db_conn.js');
const models = require('../Ensembl_communication/models.js');


module.exports={
	get_treebyID:async(id)=>{
		let tree = await models.trees_model.findOne({'id': id});
		return tree;
	}
}
