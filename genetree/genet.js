const uri = 'mongodb+srv://geneup:geneuploader@cluster0.ro4mj.mongodb.net/genes?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const conn = require('../servercore/db_conn.js');
const { tree_req } = require('./ensamble_request.js');
const ensamble_request = require('./ensamble_request.js');

async function fun(){
    let genearray = await conn.get_all_genes_for_species("rat");
   /* genearray.genes.forEach( async (element) => {
    });*/

    var genetree_singlegene= await ensamble_request.tree_req(genearray.genes[0]);
    console.error('GENETREEEEEEEEEEEEE'+genetree_singlegene);
    return;
}

fun();


