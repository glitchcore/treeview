
function drawEdge(edge, ctx, params) {
	// get array of nodes and draw a line
}


function drawNodePoint(node, ctx, params) {
	// get node.x:node.y and draw a circle
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.closePath();



	ctx.strokeStyle = "#000";
	ctx.stroke();
}

function drawNodeText(node, ctx, params) {
	// get node.value and print to node.x:node.y
}

function drawNode(node, ctx, params) {
	drawNodeText(node, ctx, params);
	drawNodePoint(node, ctx, params);
}

function Treeview(tree, canvas, params) {
	// get ctx
	var ctx = canvas.getctx("2d");
	
	// apply width and height of canvas
	ctx.width = canvas.width;
	ctx.height = canvas.height;
	
	// value in percentage of ctx height
	ctx.hp = function(percent) { return (percent/100) * this.height; }
	
	// value in percentage of ctx width
	ctx.wp = function(percent) { return (percent/100) * this.width; }
	
	// TASK recursive tree traversal
	
	/* test for wp and hp
	console.log("50% of width:", ctx.wp(50));
	console.log("50% of height:", ctx.wp(50));
	test OK */
	
	/* test for draw function */
	var fooNode0 = {value:42, x:ctx.wp(50), y:ctx.hp(50)};
	var fooNode1 = {value:14, x:ctx.wp(80), y:ctx.hp(80)};
	var fooNode2 = {value:88, x:ctx.wp(20), y:ctx.hp(80)};
	drawNode(fooNode0, ctx, params.node);
	drawNode(fooNode1, ctx, params.node);
	drawNode(fooNode2, ctx, params.node);
	drawEdge([fooNode0,fooNode1], ctx, params.edge);
	drawEdge([fooNode0,fooNode2], ctx, params.edge);
}