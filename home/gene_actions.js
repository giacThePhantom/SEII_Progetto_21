const urlParams = new URLSearchParams(window.location.search);
const gene = urlParams.get('gene');
console.log(gene);

var title = document.getElementById("title");
title.innerHTML=gene;

//list_info= "blubbbbuzprgreng";
//let list_info= await req_information_gene();
//paragraph.innerHTML=list_info;

var para = document.createElement("P");     
//req_information_gene().then((ret)=>{para.innerText=ret.json(); document.body.appendChild(para);});     
console.log('Requiring gene info');
fetch('./api/v2/gene/' + gene).then( (ret) => {
	console.log(ret);
	ret.json().then((test) => {
	console.log(test);
	para.innerText = test.species;
	document.body.appendChild(para);
	});	
	
	
}).catch( error => console.error('Error in fetch' + error));

//async function req_information_gene(){
//	return fetch('//localhost:3000/api/v2/gene/'+gene)
//   .catch( error => console.error(error) ); // If there is any error you will catch them here
//}
