const mongoose = require('mongoose');
const db_init = require('../Ensembl_communication/db_init');
const conn = require('./db_conn')
const uri = 'mongodb+srv://geneup:geneuploader@cluster0.ro4mj.mongodb.net/genes?retryWrites=true&w=majority';


var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

var GENE_LIST_LOCATION= 'C:\\Users\\Elisa\\Desktop\\progettoSE\\SEII_Progetto_21\\Ensembl_communication\\Jsons\\';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));


//Start the database
const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Gene server listening at http://localhost:' + port);  
});

/*function getidgene (file_data){
    var obj = JSON.parse(file_data, function (key, value){
        if (key == "id"){
            list.push(value);
        }
    });
}*/


function get_list_gene(file_name) {
  try {
    const listgenes = require(GENE_LIST_LOCATION+file_name); 
    return listgenes;
  } catch (error) {
    return null;
  }
    
}

app.get('/api/v1/species/:species/:identifier', function (req, res) {
  var species = req.params.species;
  var identifier = req.params.identifier;
  var genes = get_list_gene(species+".json");
  res.status(200).send(conn.get_gene_info_for_species(species, identifier));
  /*genes.forEach(element => { //controllo la lista dei geni e restituisco info di un singolo gene
    if (element.id == identifier){
      res.status(200).send(element);
    }
  });
  res.status(404).json({error: 'gene not found'});*/

});

app.get('/api/v1/species/:species', function (req, res) {
    var species = req.params.species;
    var genes = get_list_gene(species+".json");
    if(genes) {
      res.status(200).send(genes);
    } else {
      res.status(404).json({error: 'species not found'});
    }
  
  });

app.get('/api/v1/species', function(req, res) {
  var species = '{["chicken", "human", "mouse", "rat", "zebrafish"]}';
  res.status(200).send(species);
});

console.log('Starting db init');
//db_init.start();
  

