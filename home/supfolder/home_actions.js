

/*
<select id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
*/

function dropdown(){
  console.log("click");
  var dirslot_array = document.getElementsByTagName("DIV");
  count=0;
  for(dirslot of dirslot_array){
    if(dirslot.id == "dropdownmenu"){
      dirslot.innerHTML='';
      dirslot.appendChild(dropdown = document.createElement("SELECT"));
      dropdown.setAttribute("onchange",'rimuovi('+count+')');
      dropdown.setAttribute("id",count);
      let i;
      let testo="cose"
      for(i=0;i<4;i++){
        console.log(i);
        let option = document.createElement("OPTION");
        option.appendChild(document.createTextNode(''+testo+i));
        option.setAttribute("value",testo+""+i);
        dropdown.appendChild(option);
      }
      count++;
      console.log(dirslot.innerHTML);
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
