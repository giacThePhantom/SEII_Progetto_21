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

    let all_spicies= conn.get_all_species();
    for(spicie of all_spicies){
      let genes = await conn.get_all_genes_for_species(spicies);
      if(genes.length>0)
        for(gene of genes){
          let gene_ens_version = await get_ensembl_gene_version(gene.id);
          if(gene_ens_version > gene.version){
            console.log("C'e' da aggiornare "+gene.version);
            update_gene(gene);
          }
          else{
            console.log("Non c'e' da aggiornare "+gene.version);
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
  gene.chromosome   = gene_ens_info.seq_region_name;
  gene.strand       = gene_ens_info.strand;
  gene.description  = gene_ens_info.description;
  gene.sequence     = await get_ensembl_gene_sequence();
  gene.save();
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
  return ensembl_get_plain(API_SEQUENCE+gene+'?')
    .then((ret)=>{
      ret=ret.body;
      return ret;
    }
  );
}




// DEBUG:
let see_gene_db = async ()=>{
  let all_spicies= conn.get_all_species();
  for (spicie of all_spicies){
    let genes = await conn.get_all_genes_for_species(spicie);
    console.log(genes);
  }
}

let see_spicies_db = async()=>{
  let all_spicies= conn.get_all_species();
  console.log(all_spicies);
}

let insert_species =  async (species_info) => {
  let to_be_saved = !(await species_alredy_saved(models.species_model, species_info));
  if(to_be_saved){
    let to_be_inserted = new models.species_model(species_info);
    console.log(to_be_inserted);
    await to_be_inserted.save((err) => {console.log(err, 'Inserted correctly', 'Inserted species info');});
  }
  return to_be_saved;
}

let insert_genes =  async (genes_info) => {
  let to_be_saved = !(await genes_alredy_saved(models.genes_model, genes_info));
  if(to_be_saved){
    let to_be_inserted = new models.genes_model(genes_info);
    console.log(to_be_inserted);
    await to_be_inserted.save((err) => {console.log(err, 'Inserted correctly', 'Inserted species info');});
  }
  return to_be_saved;
}

async function species_alredy_saved(model, species_info){
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

async function genes_alredy_saved(model, genes_info){
	let data = await model.find({'name': genes_info.id});
	let res;
	if(data.length > 0){
		res = true;
	}
	else{
		res = false;
	}
	return res;
}



let get_all_species =async ()=>{
  let species_found = await models.species_model.find({}, {_id : false});
  return species_found;
}















//ACTIONS:

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

//update_all_genes();



/*
let specie_inserted = new models.species_model({name: "ratto", genes:['ENSG00000157764']});
insert_species(specie_inserted);

let gene_inserted = new models.genes_model({
  id:'ENSG00000157764',
  version:'14',
  start: 12,
  end: 13,
  biotype:'eheh',
  chromosome:'21',
  strand:34,
  description:"e' una prova",
  sequence:'LOLLONE',
  gene_tree:'questo'
});
insert_genes(gene_inserted);
*/















//
