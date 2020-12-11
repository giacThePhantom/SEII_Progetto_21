// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
} else if(d._children){
	d.children = d._children;
	d._children = null;
  }
	else {
		alert("nessun figlio")
	}
  update(d);
}
function collapseAll(root){
		if(root._children)
			expandAll(root)
    root.children.forEach(collapse);
    collapse(root);
    update(root);
}
function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}
function expandAll(root){
	if(root.children)
		collapseAll(root)
  root._children.forEach(expand);
	expand(root)
  update(root);
}
function expand(d) {
  if (d._children) {
    d.children = d._children;
    d.children.forEach(expand);
    d._children = null;
  }
}
var margin = {top: 20, right: 120, bottom: 20, left: 120};
width = 10000 - margin.right - margin.left;
height = 10000 - margin.top - margin.bottom;
function visualizeTree(treeID){


i = 0, duration=1;

tree = d3.layout.tree()
	.size([height, width]);

diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

svg = d3.select("#treeRes").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.attr("id","svgImage")
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svgImage = document.getElementById("svgImage");

// load the external data
d3.json("http://localhost:3000/api/v2/genetree/"+treeID, function(error, treeData) {
  root = treeData;
	root.x0 = height / 2;
	root.y0 = 0;
  update(root);
	collapseAll(root)
	slider.scrollTo((root.x0-slider.offsetWidth/2),(root.y0-slider.offsetHeight/2));
	duration=200;
});
}
function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100;});

  // Declare the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) {
		  return "translate(" + source.x0 + "," + source.y0 + ")"; })
		.on("click", click)
		.on("mouseover", function(){
          text=this.getElementsByTagName("text")[0];
					text.style.fontSize=50;
					this.style.zIndex=10000000;
					console.log(d3.select(this));
          console.log(this);
      })
			.on("mouseleave", function(){
	          text=this.getElementsByTagName("text")[0];
						text.style.fontSize=12;
						this.style.zIndex=0;

	          // Get x & y co-ordinates
	          console.log(d3.mouse(this));
	      })

  nodeEnter.append("circle")
	  .attr("r", 20)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });


  nodeEnter.append("text")
	  .attr("x", function(d) {
		  return d.children || d._children ? -23 : 23; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) {
		  return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.root_species; })
	  .style("fill-opacity", 1);



	// Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 20)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	nodeUpdate.select("text")
 	  .style("fill-opacity", 1);


	var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Declare the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
	link.enter().insert("path", "g")
	 .attr("class", "link")
	 .attr("d", function(d) {
	 var o = {x: source.x0, y: source.y0};
	 return diagonal({source: o, target: o});
	 });

	 // Transition links to their new position.
   link.transition()
 	  .duration(duration)
 	  .attr("d", diagonal);

   // Transition exiting nodes to the parent's new position.
   link.exit().transition()
 	  .duration(duration)
 	  .attr("d", function(d) {
 		var o = {x: source.x, y: source.y};
 		return diagonal({source: o, target: o});
 	  })
 	  .remove();

   // Stash the old positions for transition.
   nodes.forEach(function(d) {
 	d.x0 = d.x;
 	d.y0 = d.y;
   });



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
const slider = document.querySelector(".scroll");
let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;
slider.addEventListener("mousedown", e => {
	console.log("mousedown");
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  startY = e.pageY - slider.offsetTop;
  scrollLeft = slider.scrollLeft;
  scrollTop = slider.scrollTop;
	slider.style.cursor="grabbing";
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
	slider.style.cursor="grab";
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
	slider.style.cursor="grab";
	slider.classList.remove("active");
	});
	slider.addEventListener("mousemove", e => {
	  if (!isDown) return;
	  e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
	  const y = e.pageY - slider.offsetTop;
	  const walkX = x - startX;
	  const walkY = y - startY;
		console.log(walkY,scrollTop-walkY,walkX,scrollLeft-walkX);
	  slider.scrollLeft = scrollLeft - walkX;
	  slider.scrollTop = scrollTop - walkY;
	});

	var viewBox = {x:0,y:0,w:width,h:height};
	var scale = 1;
slider.onmousewheel = function(e) {
	e.preventDefault();
	var w = viewBox.w;
	var h = viewBox.h;
	var mx = e.offsetX;//mouse x
	var my = e.offsetY;
	var dw = w*Math.sign(e.deltaY)*(-0.1);
	var dh = h*Math.sign(e.deltaY)*(-0.1);
	var dx = dw*mx/width;
	var dy = dh*my/height;
	viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
	scale = width/viewBox.w;
	handle_text(scale)
	svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
};
function handle_text(scale) {
	var nodes = slider.getElementsByClassName("node");
	for(let item of nodes){
		//item.children[1].style.fontSize=12/scale
	}

}
