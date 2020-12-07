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

const { MongoClient } = require("mongodb");
const uri ='mongodb+srv://Ettore:Ettore@cluster0.lybx2.mongodb.net/gene?retryWrites=true&w=majority'
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
conn.get_all_species().then((ret)=>console.log(ret));

update_all_genes();


//Funzia
module.export = {
  update_all_genes:()=>{

    let all_spicies= conn.get_all_species;
    for(spicie of all_spicies){
      let genes = conn.get_all_genes_for_species(spicies);
      if(genes.)
      for(gene of genes){
        let gene_ens_version = await get_ensembl_gene_version(gene.id);
        if(gene_ens_version > gene.version){
          console.log("C'e' da aggiornare "+gene.version);
          update_gene(gene);
        }
        else{
          console.log("Non c'e' da aggiornare "gene.version);
        }
      }
    }
  }


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
  return read.ensembl_get(API_INFO+gene.id+'?')
    .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret;
    }
  );
}

async function update_gene(gene){
  let gene_ens_info = get_ensembl_gene_info(gene);
  gene.version      = gene_ens_info.version;
  gene.start        = gene_ens_info.start;
  gene.end          = gene_ens_info.end;
  gene.biotype      = gene_ens_info.biotype;
  gene.strand       = gene_ens_info.strand;
  gene.description  = gene_ens_info.description;
  gene.sequence     = await get_ensembl_gene_sequence();
}



async function ensembl_get_plain(content){
  return await got(ENSEMBL_API + content + FORMAT_JSON).catch((err) => {
    if(err.response.statusCode == 404){
      console.log('Could not find ' + ENSEMBL_API + content + FORMAT_JSON);
    }
    else throw err;
  });
}



async function get_ensembl_gene_sequence(gene){
  return ensembl_get_plain(API_SEQUENCE+gene.id+'?')
    .then((ret)=>{
      ret=JSON.parse(ret.body);
      return ret;
    }
  );
}
