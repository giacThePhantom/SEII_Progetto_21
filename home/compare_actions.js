const urlParams = new URLSearchParams(window.location.search);
const specie1 = urlParams.get('specie1');
const specie2= urlParams.get('specie2');
//console.log(specie1);
//console.log(specie2);

if (specie1==specie2){
    var badrequest = document.getElementById("namespecies");
    //console.log(badrequest);
    badrequest.innerHTML="";
    //se le due specie sono uguali, finestra di alert e ritorno a pagina precendente
    alert("Scegli specie distinte!");
    if (alert)
        window.location="/home.html";
}

else{

		document.getElementById("sp1").innerHTML=specie1.replace("_"," ").toUpperCase();
		document.getElementById("sp2").innerHTML=specie2.replace("_"," ").toUpperCase();
		document.body.innerHTML+="<div id=\"infodiv\"style=\"text-align:center\">Loading your data...</div>";
    let homologies= req_list_genes();
}
var array_crom,all_list;
function req_list_genes(){
	let tokenInfo = JSON.parse(window.localStorage.getItem("tokenInfo"));
	return fetch('./api/v2/genome/compara?species1='+specie1+"&species2="+specie2+"&token="+JSON.stringify(tokenInfo))
	.then((risp) =>risp.json())
	.then((data)=>{
		//console.log(data);
		//console.log(data.species1.genes.length/2);
		all_list=data.species1.genes;
		let ul_sp1=document.getElementById("species1_list_top");
		let ul_sp2=document.getElementById("species2_list_top");
		filterArr();
		let infodiv=document.getElementById("infodiv");
		document.body.removeChild(infodiv);
	})
  /* .catch( error => console.error(error) )*/; // If there is any error you will catch them here
}
function filterArr(name_filter,start_filter,chr_filter){
	if(!start_filter)
		start_filter=0;
	if(!name_filter)
		name_filter="";
	if(!chr_filter)
		chr_filter="";
	//console.log(name_filter,start_filter,chr_filter);
	//console.log(all_list);
	array_crom=all_list.filter((el)=>{
		return el.id.startsWith(name_filter) && el.chromosome && el.chromosome.startsWith(chr_filter) && el.start>start_filter;
	})
	//console.log(array_crom);
	f(200,100,Math.ceil(array_crom.length/2));
}
function filterRes() {
	let name_filter=document.getElementById("name_filter").value;
	let start_filter=document.getElementById("start_filter").value;
	let chr_filter=document.getElementById("chr_filter").value;
	filterArr(name_filter,start_filter,chr_filter);
}
var f = ((width,height,sections) => {
	let length=sections*height;
	let container=document.getElementById("content");
	container.innerHTML=""
	container.setAttribute("width",width+"px")
	container.setAttribute("stroke","black")
	container.setAttribute("height",(length+width)*2+"px")
	// create the svg element
	let cromatidio_top_right = document.createElementNS("http://www.w3.org/2000/svg","path");
	cromatidio_top_right.setAttribute("width",width+"px");
	cromatidio_top_right.setAttribute("height",(length+width)+"px");
	//cromatidio_top_right.setAttribute("d","M"+width/2+",0 a"+width/2+","+width/2+" 0 0 1 "+width/2+","+width/2+" v"+length+" L"+width/2+","+(length+width)+" L"+(width/2-width/2)+","+(length+width/2)+" v-"+length+" a"+width/2+","+width/2+" 0 0 1 "+width/2+",-"+width/2+" z");
	cromatidio_top_right.setAttribute("d","M"+width/2+",0 a"+width/2+","+width/2+" 0 0 1 "+width/2+","+width/2+" h-"+width/2+" z m0,"+(sections*height+width)+" v-"+width/2+" h"+width/2+" z");
	cromatidio_top_right.setAttribute("fill","mediumseagreen")


	let cromatidio_top_left=cromatidio_top_right.cloneNode();
	cromatidio_top_left.setAttribute('transform', "translate("+width+",0) scale(-1,1)");
	cromatidio_top_left.setAttribute("fill","mediumorchid")

	container.appendChild(cromatidio_top_right);
	container.appendChild(cromatidio_top_left);




	let cromatidio_bottom_right=cromatidio_top_right.cloneNode();
	cromatidio_bottom_right.setAttribute('transform', "translate(0,"+((width+sections*height)*2)+") scale(1,-1)");


	let cromatidio_bottom_left=cromatidio_top_left.cloneNode();
	cromatidio_bottom_left.setAttribute('transform', "translate("+width+","+((width+sections*height)*2)+") scale(-1,-1)");

	container.appendChild(cromatidio_bottom_right);
	container.appendChild(cromatidio_bottom_left);

	let cromatidio_center_left=document.createElementNS("http://www.w3.org/2000/svg","path");
	let cromatidio_center_right=document.createElementNS("http://www.w3.org/2000/svg","path");
	cromatidio_center_left.setAttribute("width",width/2+"px");
	cromatidio_center_left.setAttribute("height",width/2+"px");
	cromatidio_center_right.setAttribute("width",width/2+"px");
	cromatidio_center_right.setAttribute("height",width/2+"px");
	//cromatidio_center.setAttribute("d","M"+width/4+","+(length+width)+" a"+width/4+","+width/4+" 0 0 1 "+width/2+",0  a"+width/4+","+width/4+" 0 0 1 -"+width/2+",0 z");
	cromatidio_center_left.setAttribute("d","M"+width/2+","+(length+width*5/4)+" a"+width/4+","+width/4+" 0 0 1 0,-"+width/2+" z");
	cromatidio_center_left.setAttribute("fill","darkorchid")

	cromatidio_center_right.setAttribute("d","M"+width/2+","+(length+width*3/4)+" a"+width/4+","+width/4+" 0 0 1 0,"+width/2+" z");
	cromatidio_center_right.setAttribute("fill","forestgreen")
	container.appendChild(cromatidio_center_left);
	container.appendChild(cromatidio_center_right);


	let colors=["darkorchid","plum","forestgreen","lawngreen"]
	let ul_sp1_top=document.getElementById("species1_list_top");
	let ul_sp2_top=document.getElementById("species2_list_top");
	let ul_sp1_bottom=document.getElementById("species1_list_bottom");
	let ul_sp2_bottom=document.getElementById("species2_list_bottom");
	ul_sp1_top.innerHTML="";
	ul_sp1_bottom.innerHTML="";
	ul_sp2_top.innerHTML="";
	ul_sp2_bottom.innerHTML="";
	for(let i=0;i<sections;i++){

		rect1=document.createElementNS("http://www.w3.org/2000/svg","path");
		pathString="M0,"+(height*i+width/2)+" h"+width/2+" v"+height+" h-"+width/2+" v-"+height+" z ";
		rect1.setAttribute("d",pathString);
		rect1.setAttribute("fill",colors[i%2]);
		//rect1.setAttribute("onclick","window.location=\"/api/v2/gene/"+array_crom[i]["id"]+"\"");
		if(i<array_crom.length)
			rect1.setAttribute("onclick","window.open(\"/gene_view.html?gene="+(array_crom[i]["id"])+"\",\"_blank\")");
		rect1.setAttribute("class","croma_cell");
		container.appendChild(rect1);

		rect2=document.createElementNS("http://www.w3.org/2000/svg","path");
		pathString="M"+width/2+","+(height*i+width/2)+" h"+width/2+" v"+height+" h-"+width/2+" v-"+height+" z";
		rect2.setAttribute("d",pathString);
		rect2.setAttribute("fill",colors[i%2+2]);
		//rect2.setAttribute("onclick","window.location=\"/api/v2/gene/"+(array_crom[i]["homologies"]["target_id"])+"\"");
		if(i<array_crom.length)
			rect2.setAttribute("onclick","window.open(\"/gene_view.html?gene="+(array_crom[i]["homologies"]["target_id"])+"\",\"_blank\")");
		rect2.setAttribute("class","croma_cell");
		container.appendChild(rect2);


		let li1 = document.createElement("li");
		if(i<array_crom.length)
			li1.appendChild(document.createTextNode(array_crom[i]["id"]));
		else
			li1.appendChild(document.createTextNode(" "));
		li1.style.marginTop="66px";
		if(i==0)
			li1.style.marginTop="16px";
		ul_sp1_top.appendChild(li1);

		let li2 = document.createElement("li");
		if(i+sections<array_crom.length)
			li2.appendChild(document.createTextNode(array_crom[i+sections]["id"]));
		else{
			li2.setAttribute("class","last_element")
		}
		li2.style.marginTop="66px";
		if(i==0)
			li2.style.marginTop="16px";
		ul_sp1_bottom.appendChild(li2);




		rect3=document.createElementNS("http://www.w3.org/2000/svg","path");
		pathString="M0,"+(sections*height+width*3/2+i*height)+" h"+width/2+" v"+height+" h-"+width/2+" v-"+height+" z";
		rect3.setAttribute("d",pathString);
		rect3.setAttribute("fill",colors[(i+1)%2]);
		if(i+sections<array_crom.length)
			rect3.setAttribute("onclick","window.open(\"/gene_view.html?gene="+(array_crom[i+sections]["id"])+"\",\"_blank\")");
		rect3.setAttribute("class","croma_cell");
		container.appendChild(rect3);

		rect4=document.createElementNS("http://www.w3.org/2000/svg","path");
		pathString="M"+width/2+","+(sections*height+width*3/2+i*height)+" h"+width/2+" v"+height+" h-"+width/2+" v-"+height+" z";
		rect4.setAttribute("d",pathString);
		rect4.setAttribute("fill",colors[(i+1)%2+2]);
		if(i+sections<array_crom.length)
			rect4.setAttribute("onclick","window.open(\"/gene_view.html?gene="+(array_crom[i+sections]["homologies"]["target_id"])+"\",\"_blank\")");
		rect4.setAttribute("class","croma_cell");
		container.appendChild(rect4);

		let li3 = document.createElement("li");
		if(i<array_crom.length)
			li3.appendChild(document.createTextNode(array_crom[i]["homologies"]["target_id"]));
		li3.style.marginTop="66px";
		if(i==0)
			li3.style.marginTop="16px";
		ul_sp2_top.appendChild(li3);

		let li4 = document.createElement("li");
		if(i+sections<array_crom.length)
			li4.appendChild(document.createTextNode(array_crom[i+sections]["homologies"]["target_id"]));
		else{
			li4.setAttribute("class","last_element")
		}
		li4.style.marginTop="66px";
		if(i==0)
			li4.style.marginTop="16px";
		ul_sp2_bottom.appendChild(li4);
	}

	let top_l=document.getElementById("left_top_cell");
	let top_r=document.getElementById("right_top_cell");
	let max= (top_l.offsetWidth>top_r.offsetWidth)?top_l.offsetWidth:top_r.offsetWidth;
	top_l.width=max;
	top_r.width=max;
});
/*rndwidth=(Math.floor(Math.random() * 10)+10)*9;
rndheight=(Math.floor(Math.random() * 5)+5)*9;
rndsections=Math.floor(Math.random() * 10)+5;
f(rndwidth,rndheight,1);

const interval = setInterval(function() {

	rndwidth=(Math.floor(Math.random() * 10)+10)*9;
	rndheight=(Math.floor(Math.random() * 5)+5)*9;
	rndsections=Math.floor(Math.random() * 10)+5;
	f(rndwidth,rndheight,rndsections);
}, 1000);*/
