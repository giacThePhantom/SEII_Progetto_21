function go_to_profile(){
	window.location="/profile.html";
}
function logout(){
	if(window.localStorage.getItem("tokenInfo")){
		window.localStorage.removeItem("tokenInfo")
		window.location.reload();
	}
}
