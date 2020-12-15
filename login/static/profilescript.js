let tokenInfo = JSON.parse(window.localStorage.getItem("tokenInfo"));

function history_element_parse(element){
	var ret;
	if(element.startsWith("/api/v2/gene/")){
		ret="Gene ID: " + element.replace("/api/v2/gene/","");
	}else if (element.startsWith("/api/v2/species/")) {
		ret= "Species: " + element.replace("/api/v2/species/","");
	}else if (element.startsWith("/comparison.html?")) {
			ret= "Compara: " + element.replace("/comparison.html?","").replace("specie1=","").replace("&specie2="," e ");
	}else if (element.startsWith("/gene_view.html?")) {
			ret= "Dati gene: " + element.replace("/gene_view.html?","").replace("gene=","");
	}else {
	ret=element;
	}
	return ret;
}

async function deleteUser(){
	//console.log(tokenInfo.self.substring(tokenInfo.self.lastIndexOf("/")+1));
	await fetch('../api/v2/users',{
		method:'delete',
		headers: {
		 'Content-Type': 'application/json'
	 },
	 body:JSON.stringify({token:tokenInfo.token,id:tokenInfo.self.substring(tokenInfo.self.lastIndexOf("/")+1)})
 }).then(()=>{
	 window.location="/home.html";
 	 window.localStorage.removeItem("tokenInfo")
 });
}

function parseHistory(history_array,table){
	if(history_array.length==0){
		let row=table.insertRow();
		row.innerHTML="<td> Nessun elemento nella cronologia ricerche </td>";
	}
	else{
		var last_child;
		history_array.forEach(element =>{
				let row=table.insertRow();
				let cell=row.insertCell();
				let a = document.createElement("a");
				a.href=element;
				a.innerHTML=history_element_parse(element);
				cell.appendChild(a);


				row=table.insertRow();
				cell=row.insertCell();
				let hr = document.createElement("hr");
				cell.appendChild(hr);
				last_child= row;
		});
		table.getElementsByTagName("tbody")[0].removeChild(table.getElementsByTagName("tbody")[0].lastElementChild)
	}
}
function getUserInfo(){
	try{
		//console.log(tokenInfo.self+"?token="+tokenInfo.token);
	fetch(tokenInfo.self+"?token="+tokenInfo.token)
	.then((resp)=>resp.json())
	.then(function(data){
		let username=document.getElementById("username_field");
		let email=document.getElementById("email_field");
		let search_history=document.getElementById("search_history");
		//console.log(data);
		username.value=data.username;
		email.value=data.email;
		parseHistory(data.history,search_history)
		if(!data.username || !data.email)
			throw data.message
		return;
	})
	.catch(e=>{
			window.location="/login.html";
			return;
	})
}
catch(err){
	window.location="/login.html";
}
}

function updateData(){
	let username=document.getElementById("username_field").value;
	let email=document.getElementById("email_field").value;
	let password=document.getElementById("password_field").value;
	let password2=document.getElementById("password2_field").value;
	if(password==password2)
		update(email,username,password);
	else {
		alert("Le password inserite non coincidono")
	}
}

function update(email,username,password){
	fetch('../api/v2/users/updateInfo',{
		method:'post',
		headers: {
		 'Content-Type': 'application/json'
	 },
	 body:JSON.stringify({email:email,username:username,password:password,token:tokenInfo.token,self:tokenInfo.self})
	})
}



getUserInfo();
