const read = require('./read_data.js');
const models = require('./models.js');
const got = require('got');
const mongoose = require('mongoose');
const API_ONLY_VER='archive/id/';
const API_INFO='lookup/id/';
const API_SEQUENCE='sequence/id/';
const CONTENT_JSON =';content-type=text/plain'
const ENSEMBL_API = 'https://rest.ensembl.org/'




module.export = {
 /*
  * Looks through the database's genes and compare their version with
  * the ensembl version. If the ensamble verion is higher then
  * updates that gene in the database.
  */
  update_all_genes: async ()=>{
    let all_spicies= await get_all_species();
    for(spicie of all_spicies){
      if( spicie.genes.length>0 ){
        for(gene of spicie.genes){
          let gene_ens_version = await get_ensembl_gene_version(gene);
          let gene_db=await get_gene_db(gene);
          if( gene_db.id === undefined ){
            let filtered_gene = await filtre_ensembl_gene(gene);
            //console.log(filtered_gene);
          }
          else{
            if(gene_ens_version > gene_db.version){
              gene_to_be_saved = filtre_ensembl_gene(gene);
              gene_to_be_saved.save();
            }
          }
        }
      }
    }
  }
}


 /*
  * Takes from the database the spacified gene
  * @param {string} the id of the gene
  * @return {Object} the gene of the database or if a gene is not found an error
  */
async function get_gene_db(gene){
  ret =  await models.genes_model.findOne({'id':gene});
  if(!ret){
    ret={error: "Cannot found gene " + gene};
  }
  return ret;
}


 /*
  *Gets all the spicies from the database
  * @return {Array} An array of all the spicies of the database
  */
let get_all_species =async ()=>{
  let species_found = await models.species_model.find({}, {_id : false});
  return species_found;
}



 /*
  * Gets the selected gene's version from ensembl
  * @param {String} the id of the selected gene
  * @return {Integer} the number of the updated gene version
  */
async function get_ensembl_gene_version(gene){
  return read.ensembl_get(API_ONLY_VER+gene+'?')
  .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret.version;
    }
  );
}



 /*
  * Gets the information of the selected gene from the database
  * @param {String} the id of the selected gene
  * @return {Object} the parsed gene form ensembl
  */
async function get_ensembl_gene_info(gene){
  //console.log(API_INFO+gene+'?');
  return read.ensembl_get(API_INFO+gene+'?')
    .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret;
    }
  );
}



 /*
  * Filters the information form the ensembl gene
  * @param {String} the id of the gene
  * @return {Object} the object of the gene filtered
  */
async function filtre_ensembl_gene(gene){
  let gene_ens_info = await get_ensembl_gene_info(gene);
  let filtered_gene = new models.genes_model;
  filtered_gene.id           = gene_ens_info.id;
  filtered_gene.version      = gene_ens_info.version;
  filtered_gene.start        = gene_ens_info.start;
  filtered_gene.end          = gene_ens_info.end;
  filtered_gene.biotype      = gene_ens_info.biotype;
  filtered_gene.chromosome   = gene_ens_info.seq_region_name;
  filtered_gene.strand       = gene_ens_info.strand;
  filtered_gene.description  = gene_ens_info.description;
  filtered_gene.sequence     = await get_ensembl_gene_sequence(filtered_gene.id);
  return filtered_gene;
}




/*
 * Async function to request API Information.
 * @param {String} content of the request.
 * @return {String} the request.
 */
async function ensembl_get_plain(content){
  //console.log(ENSEMBL_API + content + CONTENT_JSON)
  return await got(ENSEMBL_API + content + CONTENT_JSON).catch((err) => {
    if(err.response.statusCode == 404){
      //console.log('Could not find ' + ENSEMBL_API + content + CONTENT_JSON);
    }
    else throw err;
  });
}



 /*
  * Gets the sequence of the gene from ensemble
  * @param {String} the id of the selected gene
  * @return {String} the entire sequence of the gene
  */
async function get_ensembl_gene_sequence(gene){
  return ensembl_get_plain(API_SEQUENCE+gene+'?')
    .then((ret)=>{
      ret=ret.body;
      return ret;
    }
  );
}

/*

//ACTIONS FOR TESTING:

const { MongoClient } = require("mongodb");
//const uri ='mongodb+srv://Ettore:Ettore@cluster0.lybx2.mongodb.net/gene?retryWrites=true&w=majority'
const uri = 'mongodb+srv://geneup:geneuploader@cluster0.ro4mj.mongodb.net/genes';

//const client = new MongoClient(uri,{useUnifiedTopology: true});
//const dbName = "gene";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => handleError(error));

// Or:
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  handleError(error);
}
update_all_genes();
*/
