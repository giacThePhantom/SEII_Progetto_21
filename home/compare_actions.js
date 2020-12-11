const urlParams = new URLSearchParams(window.location.search);
const specie1 = urlParams.get('specie1');
const specie2= urlParams.get('specie2');
console.log(specie1);
console.log(specie2);