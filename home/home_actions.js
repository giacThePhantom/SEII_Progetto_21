
async function ld_drop_down_menu(){
  var dirslot_array = document.getElementsByTagName("DIV");
  id_drop_menu=0;
  let list_spicies=await req_list_spicies();
  for(dirslot of dirslot_array){
    if(dirslot.id == "dropdownmenu"){
      dirslot.innerHTML='';
      dirslot.appendChild(dropdown = document.createElement("SELECT"));
      dropdown.setAttribute("onchange",'rimuovi('+id_drop_menu+')');
      dropdown.setAttribute("id",id_drop_menu);
      for(spicie of list_spicies){
        spicie=spicie.name;
        let option = document.createElement("OPTION");
        option.appendChild(document.createTextNode(spicie));
        option.setAttribute("value",spicie);
        dropdown.appendChild(option);
      }
      id_drop_menu++;
    }
  }
}

function rimuovi(id){
  dropdown_selected=document.getElementById(id);
  all_dropdown=document.getElementsByTagName("SELECT");
  if(all_dropdown[0].id==id){
    dropdown_unselected=all_dropdown[1];
  }
  else   dropdown_unselected=all_dropdown[0];
  dropdown_unselected.remove(dropdown_selected.selectedIndex);
}





async function req_list_spicies(){
	return await fetch('../api/v1/species')
	.then((risp) => risp.json()) // Transform the data into json
   .catch( error => console.error(error) ); // If there is any error you will catch them here
}
