let color1="lightgray";
let color2="lightgray";

function colorleft() {
  let img=document.getElementById("frontimg");
  color1="transparent";
  img.style.backgroundImage= "linear-gradient(to right,"+color1+","+color1+","+color2+" ,"+color2+")";

}

function colorright() {
  let img=document.getElementById("frontimg");
  color2="transparent";
  img.style.backgroundImage= "linear-gradient(to right,"+color1+","+color1+","+color2+" ,"+color2+")";
}
