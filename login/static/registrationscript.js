
async function addUser(email,username,password){
	console.log("aggiungo user");
	return await fetch('./api/v1/users',{
		method:'post',
		headers: {
		 'Content-Type': 'application/json'
	 },
	 body:JSON.stringify({email:email,password:password,username:username})
 })
 .then((resp) => resp.json())
 .then((res)=>{
	 console.log(res);
	 let info=document.getElementById("info");
	 if(res.error){
		 info.style.color="red";
		 info.innerHTML=res.error;
	 }else{
		 info.style.color="green";
		 info.innerHTML=res.ok;
	 }
 })
 .catch( error => console.error(error) );
}

function register() {
	let email=document.getElementById("email_field");
	let username=document.getElementById("username_field");
	let password=document.getElementById("password_field");
	let passwordre=document.getElementById("passwordre_field");
 	let info=document.getElementById("info");
	info.style.color="red";
	if(!email.value || !username.value || !password.value || !passwordre.value)
		info.innerHTML="Fill all fields";
	else {
		if(password.value==passwordre.value){
				addUser(email.value,username.value,password.value);
		}else {
			info.innerHTML="Passwords don't match";
		}
	}
}
