/*const fs = require('fs');	// File system
const got = require('got');	// HTTP requests
const conn = require('./db_conn.js');
const read = require('./read_data.js'); //
const write = require('.write_data.js');
var bodyParser = require('body-parser');

// Mount body-parser middleware, and instruct it to
// process form url-encoded data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var expess = require('express');
var app = expess();
*/
var link='https://rest.ensembl.org/archive/id/ENSG00000157767?content-type=application/json';

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
for(new_gene of new_genes){
  console.log("Cercando id "+new_gene.id);
  if(new_gene.version > db_on_pc[new_gene.id].version){
    console.log("C'e' da aggiornare\n");
  }
  else{
    console.log("Non c'e' da aggiornare\n");
  }
}
