let tokenInfo = JSON.parse(window.localStorage.getItem("tokenInfo"));
function getUserInfo(){
	//console.log(tokenInfo.self+"?token="+tokenInfo.token);
	try{
	fetch(tokenInfo.self+"?token="+tokenInfo.token)
	.then((resp)=>resp.json())
	.then(function(data){
		let username=document.getElementById("username_field");
		let email=document.getElementById("email_field");
		console.log(data);
		username.value=data.username;
		email.value=data.email;
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
	update(email,username,password);
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
