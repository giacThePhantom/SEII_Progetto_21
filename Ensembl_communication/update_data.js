const conn = require('../servercore/db_conn');
const read = require('./read_data.js');
const write = require('./write_data.js');
const models = require('./models.js');
const util = require('util');
const got = require('got');
const mongoose = require('mongoose');
const API_ONLY_VER='archive/id/';
const API_INFO='lookup/id/';
const API_SEQUENCE='sequence/id/';
const FORMAT_JSON =';content-type=text/plain'
const ENSEMBL_API = 'https://rest.ensembl.org/'




//Funzia
module.export = {
   update_all_genes: async ()=>{
    let all_spicies= await get_all_species();

    for(spicie of all_spicies){

      if( spicie.genes.length>0 ){
        for(gene of spicie.genes){
          let gene_ens_version = await get_ensembl_gene_version(gene);
          let gene_db=await get_gene_db(gene);
          if( gene_db.id===undefined ){
            let filtered_gene = await filtre_ensembl_gene(gene);
            console.log(filtered_gene);
            //insert_genes();
          }
          else{
            if(gene_ens_version > gene_db.version){
              gene_to_be_saved=filtre_ensembl_gene(gene);
              gene_to_be_saved.save();
            }
          }
        }
      }
    }
  }
}

async function get_gene_db(gene){
  ret =  await models.genes_model.findOne({'id':gene});
  if(!ret){
    ret={error: "Cannot found gene " + gene};
  }
  return ret;
}


async function get_ensembl_gene_version(gene){
  return read.ensembl_get(API_ONLY_VER+gene+'?')
  .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret.version;
    }
  );
}

async function get_ensembl_gene_info(gene){
  console.log(API_INFO+gene+'?');
  return read.ensembl_get(API_INFO+gene+'?')
    .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret;
    }
  );
}

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



async function ensembl_get_plain(content){
  console.log(ENSEMBL_API + content + FORMAT_JSON)
  return await got(ENSEMBL_API + content + FORMAT_JSON).catch((err) => {
    if(err.response.statusCode == 404){
      console.log('Could not find ' + ENSEMBL_API + content + FORMAT_JSON);
    }
    else throw err;
  });
}


async function get_ensembl_gene_sequence(gene){
  return ensembl_get_plain(API_SEQUENCE+gene+'?')
    .then((ret)=>{
      ret=ret.body;
      return ret;
    }
  );
}











//ACTIONS:

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



let update_all_genes= async ()=>{

  let all_spicies= await get_all_species();

  for(spicie of all_spicies){
    if( spicie.genes.length>0 ){
      for(gene of spicie.genes){
        let gene_ens_version = await get_ensembl_gene_version(gene);
        let gene_db=await get_gene_db(gene);
        if( gene_db.id===undefined ){
          let filtered_gene = await filtre_ensembl_gene(gene);
          console.log(filtered_gene);
        }
        else
        if(gene_ens_version > gene_db.version){
          console.log("C'e' da aggiornare "+gene_db.version);
          gene_to_be_saved=filtre_ensembl_gene(gene);
          gene_to_be_saved.save();
        }
        else{
          console.log("Non c'e' da aggiornare "+gene_db);
        }
      }
    }
    else{
      console.log("gene non e' lungo");
    }
  }
}
update_all_genes();
