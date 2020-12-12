
async function ld_drop_down_menu(){
  var dirslot_array = document.getElementsByName("dropdownmenu");
  id_drop_menu=0;
  let list_spicies=await req_list_spicies();
  for(dirslot of dirslot_array){
      dirslot.innerHTML='';
      let dropdown = document.createElement("SELECT");
      dropdown.setAttribute("id",id_drop_menu);
      dropdown.setAttribute("class", "dropdown");
      //dropdown.setAttribute("button", "button");
      //dropdown.button.setAttribute("class", "dmbutton");
      dropdown.onchange = function(){setgradient(dropdown.id)};
      dirslot.appendChild(dropdown);

      for(spicie of list_spicies){
        var presentation_name= spicie.name.split("_");
        spicie= presentation_name[0]+" "+presentation_name[1];
        let option = document.createElement("OPTION");

        option.appendChild(document.createTextNode(spicie));
        option.setAttribute("value",spicie);
        dropdown.appendChild(option);
      }
			dropdown.value="";
      id_drop_menu++;
  }
}


function setgradient(id){
  if(id==0)
    colorleft();
  else
    colorright();
}

async function req_list_spicies(){
	return await fetch('../api/v2/species')
	.then((risp) => risp.json()) // Transform the data into json
   .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function clickimage(){
  var dpmenu0= document.getElementById("0");
  var dpmenu1= document.getElementById("1");
  var specie00= dpmenu0.value.replace(" ", "_");
  var specie11= dpmenu1.value.replace(" ", "_");
	if (specie00==specie11){
		alert("Scegli specie distinte!");
	}
	else
  	window.location = "comparison.html?specie1="+specie00+"&specie2="+specie11;
}
