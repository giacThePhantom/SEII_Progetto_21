const mongoose = require('mongoose');
const db_init = require('../Ensembl_communication/db_init');
//const uri = 'mongodb://geneup:progettogeneuploader@SG-genes-40495.servers.mongodirector.com:27017/genes';
const uri='mongodb+srv://geneup:geneuploader@cluster0.ro4mj.mongodb.net/genes?authSource=admin&replicaSet=atlas-12eua9-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var GENE_LIST_LOCATION= './Ensembl_communication/Jsons';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('./login/static', {fallthrough : true}));
app.use('/menu/',express.static('./menu', {fallthrough : true}));
app.use('/',express.static('./home', {fallthrough : true}));
app.use('/', express.static('./qanda/static', {fallthrough : true}));


//Start the database
const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Gene server listening at http://localhost:' + port);
});


const users = require('../login/data/users.js');



app.use('/api/v1/users', users);

const species = require('../Ensembl_communication/Endpoints/endpoint_species.js');

app.use('/api/v2/species', species);

const gene = require('../Ensembl_communication/Endpoints/endpoint_genes.js');

app.use('/api/v2/gene', gene);

const genome = require('../Ensembl_communication/Endpoints/endpoint_genome.js');

app.use('/api/v2/genome', genome);

const qanda = require('../qanda/qanda.js');

app.use('/api/v2/qanda', qanda);





console.log('Starting db init');
//db_init.start();
