let params = (new URL(document.location)).searchParams;
let name = params.get("username");
let user;
fetch("../api/v1/users")
.then((resp)=>resp.json())
.then(function(data){
	console.log(data);
	data.forEach((item, i) => {
		console.log(item.username);
			if(item.username==name){
				user=item;
			}

	});

}).then(function(){
	console.log(user);
if(user!=undefined){
	let maincontent=document.getElementById("maincontent");
	maincontent.innerHTML=`benvenuto ${user.email}`;
}})
