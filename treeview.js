
function drawEdge(edge, ctx, params) {
	// get array of nodes and draw a line
	ctx.strokeStyle = params.color;
	ctx.lineWidth = params.thickness;
	ctx.beginPath();
    ctx.moveTo(edge[0].x, edge[0].y);
    ctx.lineTo(edge[1].x, edge[1].y);
	ctx.stroke();
}


function drawNodePoint(node, ctx, params) {
	// get node.x:node.y and draw a circle
	ctx.beginPath();
	ctx.arc(node.x, node.y, params.radius, 0, Math.PI * 2, false);
	ctx.closePath();
	
	ctx.fillStyle = params.color;
	ctx.fill();
}

function drawNodeText(node, ctx, params) {
	// get node.value and print to node.x:node.y
	ctx.font = params.size + "px sans-serif";
	ctx.textBaseline = "bottom";
	ctx.fillStyle = params.color;
	ctx.fillText(node.value, node.x + params.offset.x, node.y - params.offset.y);
}

function drawNode(node, ctx, params) {
	drawNodeText(node, ctx, params.text);
	drawNodePoint(node, ctx, params);
}

function Treeview(tree, canvas, params) {
	// get ctx
	var ctx = canvas.getContext("2d");
	
	// apply width and height of canvas
	ctx.width = canvas.width;
	ctx.height = canvas.height;
	
	// value in percentage of ctx height
	ctx.hp = function(percent) { return (percent/100) * this.height; }
	
	// value in percentage of ctx width
	ctx.wp = function(percent) { return (percent/100) * this.width; }
	
	// value in percentage of context size
	ctx.sp = function(percent) { return (percent/100) * Math.sqrt((this.width*this.width + this.height*this.height)/2); }
	
	function percent2pixel(params) {
		var res = params;
		res.edge.thickness = ctx.sp(params.edge.thickness);
		res.edge.marginRadus = ctx.sp(params.edge.marginRadus);
		res.node.radius = ctx.sp(params.node.radius);
		res.node.text.offset.x = ctx.wp(params.node.text.offset.x);
		res.node.text.offset.y = ctx.hp(params.node.text.offset.y);
		res.node.text.size = ctx.hp(params.node.text.size);
		return res;
	}
	
	params = percent2pixel(params);
	
	/* test for draw function */
	var fooNode0 = {value:42, x:ctx.wp(50), y:ctx.hp(50)};
	var fooNode1 = {value:14, x:ctx.wp(80), y:ctx.hp(80)};
	var fooNode2 = {value:88, x:ctx.wp(20), y:ctx.hp(80)};
	drawNode(fooNode0, ctx, params.node);
	drawNode(fooNode1, ctx, params.node);
	drawNode(fooNode2, ctx, params.node);
	drawEdge([fooNode0,fooNode1], ctx, params.edge);
	drawEdge([fooNode0,fooNode2], ctx, params.edge);
	
	/* recursive tree traversal */
	function splitDiapasons(diapason, count, params) {
		if (count == 0) return [diapason[0] + params.margin, diapason[1] - params.margin];
		
		var step = (diapason[1] - diapason[0])/count;
		var res = [];
		for(var x = diapason[0] + step; x <= diapason[1]; x += step) {
			res.push([
				x - step + params.margin,
				x - params.margin
			]);
		}
		return res;
	}
	/* test for tree function */
	console.log(splitDiapasons([0,50], 2, params.tree));
	
	function centerDiapason(diapason) {
		return Math.abs(diapason[1] - diapason[0])/2;
	}
	
	function traversal(tree, y, xDiapason, treeParams) {
		var x = centerDiapason(xDiapason);
		console.log("x:" + x, "y:" + y, tree.value);
		drawNode({
			value: tree.value,
			x:ctx.wp(x), 
			y:ctx.hp(y)
		}, ctx, params.node);
		// debugger;
		var diapasons = splitDiapasons(xDiapason, tree.childs.length, treeParams)
		tree.childs.forEach(function(child, idx) {
			traversal(child, y + treeParams.height, diapasons[idx], treeParams);
		});
	}
	traversal(tree, params.marginTop, [0 + params.marginLeft, 100 - params.marginRight], params.tree);
}