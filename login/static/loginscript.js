function loaduserlist(){//function used in the test phase, it retrieves from the server the entire userlist
	//const userlist=document.getElementById("userlist");

	fetch("../api/v1/users")
	.then((resp)=>resp.json())
	.then(function(data){
		console.log(data);
		data.forEach((item, i) => {
				console.log(item);
		});

	})
}
loaduserlist();

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
function sizeHandler(){ //handle the resize of the window, to get a better layout
//console.log(getWidth());
	let topmenu=document.getElementById("topmenu");
	if(getWidth()>1160)
	{
		topmenu.style.height="100px";
		//console.log("size100");
	}else{
		topmenu.style.height="150px";
		//console.log("size150");
	}
}
window.onresize=sizeHandler;
sizeHandler();


//function that try to authenticate, if there's no match in the database it returns a user not found error
function authenticate(){
	let email=document.getElementById("email_field").value;
	let psw=document.getElementById("psw_field").value;
	 fetch('../api/v1/users/auth',{
		 method:'post',
		 headers: {
      'Content-Type': 'application/json'
    },
		body:JSON.stringify({email:email,password:psw})
	})
	 .then((resp) => resp.json()) // Transform the data into json
  	.then(function(data) {
        //console.log(data.length);
				if(data.length>0){//if length=0 there is no match for the given email and password
	        loggedUser = data[0];
					 //id at where you can find the resource if you go to /api/v1/users/:id
	        loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
	        console.log( loggedUser.self);
				}
				else{
					console.log("user not found");
				}
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

}
