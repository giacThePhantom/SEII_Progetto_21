/////////////////////////////////
//handle the resize of the window, to get a better layout
function getWidth() { //function used to get the window size
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}
function sizeHandler(){
////console.log(getWidth());
	let topmenu=document.getElementById("topmenu");
	if(topmenu){
	if(getWidth()>1160)
	{
		topmenu.style.height="100px";
		////console.log("size100");
	}else{
		topmenu.style.height="150px";
		////console.log("size150");
	}
}
}
window.onresize=sizeHandler;
sizeHandler();
/////////////////////////////////


async function loaduserlist(){//function used in the test phase, it retrieves from the server the entire userlist
	//const userlist=document.getElementById("userlist");

	return await fetch("../api/v2/users")
	.then((resp)=>resp.json())
	.then(function(data){
		data.forEach((item, i) => {
				//console.log(item);
		});

	})
}




function auth(email,psw){
	fetch('../api/v2/users/auth',{
		method:'post',
		headers: {
		 'Content-Type': 'application/json'
	 },
	 body:JSON.stringify({email:email,password:psw})
 })
	.then((resp) => resp.json()) // Transform the data into json
	 .then(function(data) {
			 //console.log("data:\n"+JSON.stringify(data));
			 if(data){//if length=0 there is no match for the given email and password
				 window.localStorage.setItem("tokenInfo", JSON.stringify(data));
				 go_to_profile();
			 }
			 else{
				 //console.log("user not found");
				 return "errore";
			 }
			 return;
	 })
	 .catch( error => console.error(error) ); // If there is any error you will catch them here

}
//function that try to authenticate, if there's no match in the database it returns a user not found error
async function authenticate(){
	let email=document.getElementById("email_field").value;
	let psw=document.getElementById("psw_field").value;
	return await auth(email,psw);
}
loaduserlist();
