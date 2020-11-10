function loaduserlist(){
	const userlist=document.getElementById("userlist");

	fetch("../api/v1/users")
	.then((resp)=>resp.json())
	.then(function(data){
		console.log(data);
		//userlist.innerHTML='';
		data.forEach((item, i) => {
			//	var li=document.createElement("li");
			//	li.innerHTML=`<a href=../profile.html?username=${item.username}>${item.username}</a>`;
			//	userlist.appendChild(li);
				console.log(item);
		});

	})
}
loaduserlist();

function getWidth() {
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
console.log(getWidth());
	let topmenu=document.getElementById("topmenu");
	if(getWidth()>1160)
	{
		topmenu.style.height="100px";
		console.log("size100");
	}else{
		topmenu.style.height="150px";
		console.log("size150");
	}
}
window.onresize=sizeHandler;
sizeHandler();
