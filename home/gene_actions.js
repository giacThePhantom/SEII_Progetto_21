const urlParams = new URLSearchParams(window.location.search);
const gene = urlParams.get('gene');
console.log(gene);


function create_para(gene_info, ul){
	let para = document.createElement('LI');
	para.setAttribute('class', 'gene_infos');
	para.innerText = gene_info;
	ul.appendChild(para);
}



var title = document.getElementById("title");
title.innerHTML=gene;
console.log('Requiring gene info');
fetch('./api/v2/gene/' + gene + '?format=condensed').then( (ret) => {
	console.log(ret);
	ret.json().then((gene_infos) => {
		//Viewing gene informations
		var para = document.createElement("UL");
		for(let temp in gene_infos){
			create_para(gene_infos[temp], para);
			if(temp == 'gene_tree'){
				gene_tree_id = gene_infos[temp];
			}
			console.log(gene_infos[temp]);

			console.log(temp);		
		}
		document.body.appendChild(para);
		//Sequence view
		

		//Tree link
	});	
	
	
}).catch( error => console.error('Error in fetch' + error));

