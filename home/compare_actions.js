const urlParams = new URLSearchParams(window.location.search);
const specie1 = urlParams.get('specie1');
const specie2= urlParams.get('specie2');
console.log(specie1);
console.log(specie2);

if (specie1==specie2){
    var badrequest = document.getElementById("namespecies");
    console.log(badrequest);
    badrequest.innerHTML="";
    //se le due specie sono uguali, finestra di alert e ritorno a pagina precendente
    alert("Scegli specie distinte!");
    if (alert)
        window.history.back();
}

else{
    let homologies= req_list_genes();
}

async function req_list_genes(){
	return await fetch('../api/v1/')
	.then((risp) => risp.json()) // Transform the data into json
   .catch( error => console.error(error) ); // If there is any error you will catch them here
}