/*
 * Name:	James Tremper
 * Date:	2015-02-17
 * Desc:	.js file for my Lab 2 submission
 */
var gl;
var points;

var MAXNUMTRIANGLES = 200;
var MAXNUMVERTICES = 3 * MAXNUMTRIANGLES;

var xOffset = 0;
var yOffset = 0;

var points = [
	vec2(0.1*Math.cos(toRads(234))+xOffset,			0.1*Math.sin(toRads(234))+yOffset),
	vec2(0.1*0.38*Math.cos(toRads(342))+xOffset,	0.1*0.38*Math.sin(toRads(342))+yOffset),
	vec2(0.1*Math.cos(toRads(90))+xOffset,			0.1*Math.sin(toRads(90))+yOffset),
	vec2(0.1*Math.cos(toRads(306))+xOffset,			0.1*Math.sin(toRads(306))+yOffset),
	vec2(0.1*Math.cos(toRads(90))+xOffset,			0.1*Math.sin(toRads(90))+yOffset),
	vec2(0.1*0.38*Math.cos(toRads(198))+xOffset,	0.1*0.38*Math.sin(toRads(198))+yOffset),
	vec2(0.1*0.38*Math.cos(toRads(270))+xOffset,	0.1*0.38*Math.sin(toRads(270))+yOffset),
	vec2(0.1*Math.cos(toRads(18))+xOffset,			0.1*Math.sin(toRads(18))+yOffset),
	vec2(0.1*Math.cos(toRads(162))+xOffset,			0.1*Math.sin(toRads(162))+yOffset),
];

window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL isn't available"); }

	/* Configure WebGL */
	gl.viewport( 0, 0, canvas.width, canvas.height);
	gl.clearColor( 0.0, 0.0, 0.0, 1.0);

	/* Load shaders and initialize attribute buffers */
	var program = initShaders( gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	/* Load the data into the GPU and do plumbing */
	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 8*MAXNUMVERTICES, gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16*MAXNUMVERTICES, gl.STATIC_DRAW);

/*
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
*/

	/* Load initial position */
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	colors = [
		vec4( 1.0, 1.0, 0.0, 1.0 ),
		vec4( 0.0, 1.0, 1.0, 1.0 ),
		vec4( 1.0, 0.0, 1.0, 1.0 ),
	];
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));

	document.addEventListener("keydown", function(event) {
		console.log('key pressed');
		console.log(event.keyCode);
		switch (event.keyCode) {
		case 49:
			console.log('1 pressed');
			xOffset = 0;
			yOffset = 0;
			break;
		case 87:
			console.log('w pressed');
			if (yOffset < 0.8) { yOffset += 0.1; }
			break;
		case 65:
			if (xOffset >-0.8) { xOffset -= 0.1; }
			break;
		case 83:
			if (yOffset >-0.8) { yOffset -= 0.1; }
			break;
		case 68:
			if (xOffset < 0.8) { xOffset += 0.1; }
			break;
		}

		points = [
			vec2(0.1*Math.cos(toRads(234))+xOffset,			0.1*Math.sin(toRads(234))+yOffset),
			vec2(0.1*0.38*Math.cos(toRads(342))+xOffset,	0.1*0.38*Math.sin(toRads(342))+yOffset),
			vec2(0.1*Math.cos(toRads(90))+xOffset,			0.1*Math.sin(toRads(90))+yOffset),
			vec2(0.1*Math.cos(toRads(306))+xOffset,			0.1*Math.sin(toRads(306))+yOffset),
			vec2(0.1*Math.cos(toRads(90))+xOffset,			0.1*Math.sin(toRads(90))+yOffset),
			vec2(0.1*0.38*Math.cos(toRads(198))+xOffset,	0.1*0.38*Math.sin(toRads(198))+yOffset),
			vec2(0.1*0.38*Math.cos(toRads(270))+xOffset,	0.1*0.38*Math.sin(toRads(270))+yOffset),
			vec2(0.1*Math.cos(toRads(18))+xOffset,			0.1*Math.sin(toRads(18))+yOffset),
			vec2(0.1*Math.cos(toRads(162))+xOffset,			0.1*Math.sin(toRads(162))+yOffset),
		];

		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	} );

	/* Render the image */
	render();
};

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 9);

	window.requestAnimFrame(render);
}

function toRads(angle)
{
	return angle * (Math.PI / 180)
}

