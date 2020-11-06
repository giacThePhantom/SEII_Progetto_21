const got = require('got');
const fs = require('fs');

const ENSEMBL_API = 'http://rest.ensembl.org/'
const FORMAT_JSON = '?content-type=application/json'
const GENE_LIST_LOCATION = './Gene_List/'




function get_list_gene(file_name){
	let file_data;
	try{
		file_data = fs.readFileSync(GENE_LIST_LOCATION + file_name, 'utf-8');
	} catch(err) {
		console.error(err);
	}
	if(file_data){
		console.log('read correctly');
		file_data = file_data.split('\n');
		file_data.shift();
		console.log(file_data);
	}
	return file_data;
}




async function ensembl_get(content){
	console.log('In async');
	return await got(ENSEMBL_API + content + FORMAT_JSON);
}


/***************************TESTS**********************************/

//ensembl_get('archive/id/ENSG00000210049').then((ret) => {console.log(ret.body)});




//get_list_gene('mart_export_human.txt');
