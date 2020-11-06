const got = require('got');
const fs = require('fs');

const ENSEMBL_API = 'http://rest.ensembl.org/'
const FORMAT_JSON = '?content-type=application/json'
const GENE_LIST_LOCATION = './Gene_List/'








async function ensembl_get(content){
	console.log('In async');
	return await got(ENSEMBL_API + content + FORMAT_JSON);
}

//ensembl_get('archive/id/ENSG00000210049').then((ret) => {console.log(ret.body)});
