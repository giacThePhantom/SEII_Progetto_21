const mongoose = require('mongoose');
const db_init = require('../Ensembl_communication/db_init');
const conn = require('./db_conn')
const uri = 'mongodb+srv://geneup:geneuploader@cluster0.ro4mj.mongodb.net/genes?retryWrites=true&w=majority';


var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var GENE_LIST_LOCATION= './Ensembl_communication/Jsons';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/',express.static('../login/static'));
app.use('/menu/',express.static('../menu'));
app.use('/',express.static('../home/supfolder'));


//Start the database
const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Gene server listening at http://localhost:' + port);
});


const users = require('../login/data/users.js');



app.use('/api/v1/users', users);




app.get('/api/v1/species/:species/:identifier', function (req, res) {
  var species = req.params.species;
  var identifier = req.params.identifier;
	conn.get_gene_info_for_species(species, identifier).then((ret) => {
		if(res.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

app.get('/api/v1/species/:species', function (req, res) {
    var species = req.params.species;
	conn.get_all_genes_for_species(species).then( (ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
})




app.get('/api/v1/species', function(req, res) {
	conn.get_all_species().then((ret) => {
		res.status(200).send(ret);
	})
});


app.get('/api/v1/gene/:id', (req, res) => {
	const filters = req.query;
	console.log(filters);
	let id = req.params.id;
	conn.get_gene_info(id, filters).then( (ret) =>{
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});
});

app.get('/api/v1/gene/sequence/:id', (req, res) => {
	let id = req.params.id;
	conn.get_sequence_of_gene(id).then((ret) => {
		if(ret.error){
			res.status(404).json(ret);
		}
		else{
			res.status(200).send(ret);
		}
	});

});



console.log('Starting db init');
db_init.start();
