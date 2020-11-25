const mongoose = require('mongoose')
const { Schema } = mongoose;

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/genes';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log(mongoose);


/*
<select id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
*/

function dropdown(){
  //console.log("click");
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
        //console.log(i);
        let option = document.createElement("OPTION");
        option.appendChild(document.createTextNode(''+testo+i));
        option.setAttribute("value",testo+""+i);
        dropdown.appendChild(option);
      }
      count++;
    //  console.log(dirslot.innerHTML);
    }
  }
  test();
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

async function test(){
  console.log("TEST!!!");



  const gene = new Schema({
  	id: String
  });
  // Compile model from schema
  var Somegene = mongoose.model('Genes', gene );

  var istanza = new Somegene({id:'ENSG00000157764'});
  istanza.save(function (err) {
    if (err) return handleError(err);
  });



  let data= await models.genes_model('id',ENSG00000157764);
  //.find({'id':ENSG00000157764})
  if(data.length>0){
    console.log("yess");
  }
  else {
    console.log("NOPE")
  }
}
