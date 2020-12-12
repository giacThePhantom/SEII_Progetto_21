const urlParams = new URLSearchParams(window.location.search);
const gene = urlParams.get('gene');
console.log(gene);