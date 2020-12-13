const urlParams = new URLSearchParams(window.location.search);
const gene = urlParams.get('gene');
console.log(gene);

/**
 * Populates the ul element of html page with gene informations
 * @param {*} gene_info 
 * @param {*} temp 
 * @param {*} ul 
 */


function create_para(gene_info, temp, ul){
	let para = document.createElement('LI');
	para.setAttribute('class', 'gene_infos');
	para.innerHTML = temp+gene_info;
	ul.appendChild(para);
}
var title = document.getElementById("title");
title.innerHTML=gene;
console.log('Requiring gene info');
let list = document.createElement("UL");
fetch('./api/v2/gene/' + gene + '?format=condensed').then( (ret) => {
	console.log(ret);
	ret.json().then((gene_infos) => {
		//Viewing gene informations
        
        list.setAttribute("class", "lista");
		for(let temp in gene_infos){

            create_para(gene_infos[temp], temp+": ", list);

			if(temp == 'gene_tree'){
                gene_tree_id = gene_infos[temp];
                console.log("sopra è un gene tree");
            }
            if (temp == 'homologies'){
                listahomo=document.createElement("UL");
                list.appendChild(listahomo);
                gene_infos[temp].forEach(field => {
                    let homo_id= document.createElement('LI');
                    let homo_species=document.createElement('LI');
                    homo_id.setAttribute("class", "gene_infos1");
                    homo_id.innerHTML=field[0];
                    homo_species.setAttribute("class", "gene_infos1");
                    homo_species.innerHTML=field[1];

                    listahomo.appendChild(homo_id);
                    listahomo.appendChild(homo_species);

                });
                list.appendChild(listahomo);
            } 
            

           /* else {
                create_para(gene_infos[temp], temp+": ", list);
            }*/
			 

			console.log(temp);		
		}
        document.body.appendChild(list);
        
        //GENE TREE
        create_para("<button id= \"btnTree\", onclick= \"return_tree()\"> Tree </button>", "", list);
        //GENE SEQUENCE
        create_para("<button id= \"btnSeq\", onclick= \"return_sequence()\"> Sequence </button>", "", list);
        
	});	
	
	
}).catch( error => console.error('Error in fetch' + error));

function return_tree(){
    alert();
}

function return_sequence(){
    //if (document.getElementsById("seqq")==null){
        let seqSlide = document.createElement("TEXTAREA");
        seqSlide.setAttribute("class", "sequenza");
        seqSlide.setAttribute("id", "seqq");
        seqSlide.disabled=true;
    

    fetch('./api/v2/gene/sequence/' + gene).then( (ret) => {
        console.log(ret);
        ret.json().then((gene_sequence) => {
            seqSlide.innerHTML= gene_sequence["sequence"];
            });
    }).catch( error => console.error('Error in fetch' + error));

    list.appendChild(seqSlide);
   //}
    
}

function makeSlider(){

}