const conn = require('./db_conn');
const read = require('./read_data.js');
const write = require('./write_data.js');
const models = require('./models')
const util = require('util');
const mongoose = require('mongoose');
const API_ONLY_VER='archive/id/';


//Funzia
module.export = {
  update_all_genes:()=>{

    let list_spicies_in_db = read.get_all_lists();
    for(new_gene of new_genes){
      console.log("Cercando id "+new_gene.id);
      if(new_gene.version > db_on_pc[new_gene.id].version){
        console.log("C'e' da aggiornare\n");
      }
      else{
        console.log("Non c'e' da aggiornare\n");
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


//Test
///*
//get_ensembl_gene_version('ENSG00000157764')

console.log(read.get_all_lists());



function control_genes(gene){
  for(new_gene of new_genes){
    if(new_gene.version > db_on_pc[new_gene.id].version){
      db_on_pc[new_gene.id]=new_gene;
      /*
      gene.version = temp_json.version;
  		gene.start = temp_json.start;
  		gene.end = temp_json.end;
  		gene.biotype = temp_json.biotype;
  		gene.chromosome = temp_json.seq_region_name;
  		gene.strand = temp_json.strand;
  		gene.name = temp_json.species;
  		gene.description = temp_json.description;
  		console.log(gene);*/

      console.log("C'e' da aggiornare\n");
    }
    else{
      console.log("Non c'e' da aggiornare\n");
    }
  }
}
