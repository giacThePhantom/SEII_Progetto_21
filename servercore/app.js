//prova commit
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

var GENE_LIST_LOCATION= 'C:\Users\Elisa\Desktop\progettoSE\SEII_Progetto_21\servercore\Jsons';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));

// starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Products server listening at http://localhost:' + port);  
});

function getidgene (file_data){
    var obj = JSON.parse(file_data, function (key, value){
        if (key == "id"){
            list.push(value);
        }
    });
}


function get_list_gene(file_name) {
    let file_data;
    try {
        file_data = fs.readFileSync(GENE_LIST_LOCATION + file_name, 'utf-8');
     } catch (err) {
            console.error(err);
      }
      if (file_data) {
          //do shit
      }
    return file_data;
}

app.get('/api/species/:id', function (req, res) {
    var id = req.params.id;
    var product = products.find( (p) => p.id == id );
    if(products !== undefined) {
      res.status(200).send(product);
    } else {
      res.status(404);
    }
  
  });



