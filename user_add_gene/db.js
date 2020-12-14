//simple database like collection of data
const mongoose=require("mongoose")
const conn = require('../Ensembl_communication/db_conn.js'); //qui devo mettere il mio db
const models = require('../Ensembl_communication/models.js');
const { user_gene_model } = require("../Ensembl_communication/models.js");
const uri = 'mongodb://127.0.0.1:27017/genes';

 /*
  * Gets all the genes that have been added from the users
  * @retunr {Array} all the genes that has been added in the db form the users
  */
let users_genes = async () => {
    let users_gene = await models.user_gene_model.find({});
    return users_gene;
}

 /*
  * Gets all the genes that were added form a user
  * @param {Object} the user info
  * @return {Array} all the genes that the user added in the database
  */
let user_genes = async (user_info) => {
    let user_gene = await models.user_gene_model.find({'user':user_info.id});
    return user_gene;
}

 /*
  *Checks for a gene with the same id and user
  * @param {Object} the model of the user gene
  * @param {Object} user gene info
  * @return {Bool} if the gene is found then return true else false
  */
async function ug_already_saved(model, ug_info){
    let data = await model.find({'user': ug_info.user, 'id':{'type': ug_info.id.type}});
    let res;
    if(data.length > 0){
        res = true;
    }else{
        res = false;
    }
    return res;
}

module.exports = {
  users_genes:users_genes,
    insert_user_gene:async(ug_info) => {
      let to_be_saved = !(await ug_already_saved(models.user_gene_model,ug_info));
        if(to_be_saved){
          let to_be_inserted = await new models.user_gene_model(ug_info);
          await to_be_inserted.save((err) => {console.log(err,'inserted user gene info');});
          return to_be_inserted._id;
          }
        else{
          return to_be_saved;
        }
      },
  delete_user_gene:async(id) => {
    console.log("DELETE request received for ID : ",id);
    let data = models.user_gene_model.deleteOne({'_id':id});
    console.log(data, "\n\n");
    return data;
    },
  get_user_gene_by_id:async(id) => {
    let ugene = await models.user_gene_model.findOne({'_id':id});
    if(ugene){
      var ug_info = {
        _id: ugene._id,
        id : ugene.id,
        species: ugene.species,
        version: ugene.version,
        start: ugene.start,
        end: ugene.end,
        biotype: ugene.biotype,
        chromosome: ugene.chromosome,
        strand: ugene.strand,
        description: ugene.description,
        sequence: ugene.sequence,
        homologies: ugene.homologies,
        gene_tree: ugene.gene_tree,

        ///OCIOOOOO////
        self: "api/v1/qanda/"+qanda._id
      }
  }
  else{
    var ug_info = null;
  }
  return ug_info;
  }
}
