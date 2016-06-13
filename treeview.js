
function drawEdge(edge, context, params) {
	
}


function drawNodePoint(point, context, params) {
	// get point.x:point.y and draw a circle
}

function drawNodeText(point, context, params) {
	// get point.value and print to point.x:point.y
}

function drawNode(point, context, params) {
	drawNodeText(point, context, params);
	drawNodePoint(point, context, params);
}

function Treewiew(tree, canvas, params) {
	// TASK get context
	var ctx = {};
	
	// TASK apply width and height of canvas
	ctx.width = 0;
	ctx.height = 0;
	
	// value in percentage of context height
	ctx.hp = function(percent) { return (percent/100) * this.height; } // maybe this wouldn't work
	
	// value in percentage of context width
	ctx.wp = function(percent) { return (percent/100) * this.width; }
	
	// TASK recursive tree traversal
	
	/* test for draw function */
	var fooNode0 = {value:42, x:ctx.wp(50), y:ctx.hp(50)};
	var fooNode1 = {value:14, x:ctx.wp(80), y:ctx.hp(80)};
	var fooNode2 = {value:88, x:ctx.wp(20), y:ctx.hp(80)};
	drawNode(fooNode0, context, params);
	drawNode(fooNode1, context, params);
	drawNode(fooNode2, context, params);
	drawEdge([fooNode0,fooNode1], context, params);
	drawEdge([fooNode0,fooNode2], context, params);
}