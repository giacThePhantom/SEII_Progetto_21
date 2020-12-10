function visualizeTree(treeID){
	var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 16000 - margin.right - margin.left,
	height = 15000 - margin.top - margin.bottom;

i = 0;

tree = d3.layout.tree()
	.size([height, width]);

diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the external data
d3.json("http://localhost:3000/api/v2/genetree/"+treeID, function(error, treeData) {
  root = treeData;
  update(root);
});
}
function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);
console.log(nodes);
  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100; });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; });

  nodeEnter.append("circle")
	  .attr("r", 10)
	  .style("fill", "#fff");

  nodeEnter.append("text")
	  .attr("x", function(d) {
		  return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) {
		  return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1);

  // Declare the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", diagonal);

}

function getTreeInfo(treeID) {
	console.log("http://localhost:3000/api/v2/genetree/"+treeID);
	fetch("http://localhost:3000/api/v2/genetree/"+treeID)
		.then((resp)=>resp.json())
		.then(function(data){
			console.log(data);
      visualizeTree(data)
		})
}

function loadTree(){
	let treeID= document.getElementById("tree_id_field").value;
	visualizeTree(treeID);
}
