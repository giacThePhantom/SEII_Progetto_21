//prova commit
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

var GENE_LIST_LOCATION= 'C:\\Users\\Elisa\\Desktop\\progettoSE\\SEII_Progetto_21\\servercore\\Jsons\\';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));

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
  const listgenes = require(GENE_LIST_LOCATION+file_name); 
  console.log(listgenes); 
  return listgenes;   
}

app.get('/api/singlegene/:species', function (req, res) {
    var species = req.params.species;
    var genes = get_list_gene(species+".json");
    if(genes) {
      res.status(200).send(genes);
    } else {
      res.status(404);
    }
  
  });

  app.get('/api/species/:species', function (req, res) {
    var species = req.params.species;
    var genes = get_list_gene(species+".json");
    if(genes) {
      res.status(200).send(genes);
    } else {
      res.status(404);
    }
  
  });

