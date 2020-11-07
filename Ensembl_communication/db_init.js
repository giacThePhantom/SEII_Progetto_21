onst got = require('got');
const fs = require('fs');

const ENSEMBL_API = 'http://rest.ensembl.org/'
const FORMAT_JSON = '?content-type=application/json'
const GENE_LIST_LOCATION = './Gene_List/'




function get_list_gene(file_name) {
  let file_data;
  try {
    file_data = fs.readFileSync(GENE_LIST_LOCATION + file_name, 'utf-8');
  } catch (err) {
    console.error(err);
  }
  if (file_data) {
    file_data = file_data.split('\n');
    file_data.shift();
    file_data.pop();
  }
  return file_data;
}

async function ensembl_get(content) {
  return await got(ENSEMBL_API + content + FORMAT_JSON);
}

function save_gene(gene_information, gene_array) {
  let temp_json = JSON.parse(gene_information);
  let gene = {};
  gene.id = temp_json.id;
  gene.version = temp_json.version;
  gene.start = temp_json.start;
  gene.end = temp_json.end;
  gene.biotype = temp_json.biotype;
  gene.chromosome = temp_json.seq_region_name;
  gene.strand = temp_json.strand;
  gene.name = temp_json.logic_name;
  gene.description = temp_json.description;
  gene_array.push(gene);
}


async function write_gene_data(list_gene_file) {

	var gene_array=[];
  let gene_IDS = get_list_gene(list_gene_file);
  //gene_array = [];
	return new Promise(async function(resolve, reject){
			//do something

	for (let gene of gene_IDS) {
		await ensembl_get('lookup/id/' + gene).then((ret) => {
			save_gene(ret.body, gene_array)
		});
	}
	resolve(gene_array); //resolve with value
});
  /*while(gene_array.length != gene_IDS.length){
	//	console.log(gene_array.length);
}*/
}



/***************************TESTS**********************************/

//ensembl_get('archive/id/ENSG00000210049').then((ret) => {console.log(ret.body)});




//get_list_gene('mart_export_human.txt');
async function start(){
	let arr=await write_gene_data('mart_export_human.txt');
	console.log(arr);
}
start();
