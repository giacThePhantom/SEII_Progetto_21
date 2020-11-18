/*const fs = require('fs');	// File system
const got = require('got');	// HTTP requests
const conn = require('./db_conn.js');
const write = require('.write_data.js');
var bodyParser = require('body-parser');

// Mount body-parser middleware, and instruct it to
// process form url-encoded data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var expess = require('express');
var app = expess();
*/
const read = require('./read_data.js'); //
var util = require('util');

//Gene_List on db
var db_on_pc='[{"id":0,"version":13},{"id":1,"version":15},{"id":2,"version":38}]';
//Gene_List from ENSEMBL_API
var new_genes='[{"id":0,"version":14},{"id":1,"version":13}]';
db_on_pc=JSON.parse(db_on_pc);
new_genes=JSON.parse(new_genes);
/*
prova=JSON.parse('{"id":1,"version":13}');
console.log("PROVA: "+ prova.id+"\n");
*/

//Funzia
module.export = {
  update_all_genes:()=>{
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
//Test
///*
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

//*/
