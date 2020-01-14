// (function () {
// var canvas = document.querySelector("#canvas");
// var context = canvas.getContext("2d");
// context.beginPath();
// canvas.width = 280;
// canvas.height = 280;

// var Mouse = { x: 0, y: 0 };
// var lastMouse = { x: 0, y: 0 };
// context.fillStyle = "white";
// context.fillRect(0, 0, canvas.width, canvas.height);
// context.color = "black";

// context.lineWidth = 10;
// context.lineJoin = context.lineCap = 'round';

// debug();

// 	canvas.addEventListener("mousemove", function (e) {
// 		lastMouse.x = Mouse.x;
// 		lastMouse.y = Mouse.y;

// 		Mouse.x = e.pageX - this.offsetLeft;
// 		Mouse.y = e.pageY - this.offsetTop;

// 	}, false);

// 	canvas.addEventListener("mousedown", function (e) {
// 		canvas.addEventListener("mousemove", onPaint, false);

// 	}, false);

// 	canvas.addEventListener("mouseup", function (e) {
// 		canvas.removeEventListener("mousemove", onPaint, false);

// 	}, false);

// 	// Set up touch events for mobile, etc
// 	canvas.addEventListener("touchstart", function (e) {
// 		mousePos = getTouchPos(canvas, e);
// 		var touch = e.touches[0];
// 		var mouseEvent = new MouseEvent("mousedown", {
// 			clientX: touch.clientX,
// 			clientY: touch.clientY
// 		});
// 		canvas.dispatchEvent(mouseEvent);
// 	}, false);

// 	canvas.addEventListener("touchend", function (e) {
// 		var mouseEvent = new MouseEvent("mouseup", {});
// 		canvas.dispatchEvent(mouseEvent);
// 	}, false);

// 	canvas.addEventListener("touchmove", function (e) {
// 		var touch = e.touches[0];
// 		var mouseEvent = new MouseEvent("mousemove", {
// 			clientX: touch.clientX,
// 			clientY: touch.clientY
// 		});
// 		canvas.dispatchEvent(mouseEvent);
// 	}, false);

// 	var onPaint = function (e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		context.lineWidth = context.lineWidth;
// 		context.lineJoin = "round";
// 		context.lineCap = "round";
// 		context.strokeStyle = context.color;

// 		context.beginPath();
// 		context.moveTo(lastMouse.x, lastMouse.y);
// 		context.lineTo(Mouse.x, Mouse.y);
// 		context.closePath();
// 		context.stroke();
// 	};

// function debug() {
// 	/* CLEAR BUTTON */
// 	var clearButton = $("#clearButton");

// 	clearButton.on("click", function () {

// 		context.clearRect(0, 0, 280, 280);
// 		context.fillStyle = "white";
// 		context.fillRect(0, 0, canvas.width, canvas.height);

// 	});

// 	/* COLOR SELECTOR */

// 	$("#colors").change(function () {
// 		var color = $("#colors").val();
// 		context.color = color;
// 	});

// 	/* LINE WIDTH */

// 	$("#lineWidth").change(function () {
// 		context.lineWidth = $(this).val();
// 	});
// }
// }());
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
context.beginPath();
canvas.width = 280;
canvas.height = 280;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.color = "black";

ctx.lineWidth = 10;
ctx.lineJoin = context.lineCap = 'round';

debug();

// setup lines styles .. 


// some variables we'll need .. 
var drawing = false;
var mousePos = { x: 0, y: 0 };
var lastPos = mousePos;
var isMobile = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// mouse/touch events ..
canvas.addEventListener((isMobile ? 'touchstart' : 'mousedown'), function (e) {
	drawing = true;
	lastPos = getMousePos(canvas, e);
	mousePos = lastPos;
});
canvas.addEventListener((isMobile ? 'touchmove' : 'mousemove'), function (e) {
	mousePos = getMousePos(canvas, e);
});
canvas.addEventListener((isMobile ? 'touchend' : 'mouseup'), function (e) {
	drawing = false;
});

// helper functions .. 
function getMousePos(canvasDom, touchOrMouseEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: (isMobile ? touchOrMouseEvent.touches[0].clientX : touchOrMouseEvent.clientX) - rect.left,
		y: (isMobile ? touchOrMouseEvent.touches[0].clientY : touchOrMouseEvent.clientY) - rect.top
	};
};

// drawing .. 
window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function debug() {
	/* CLEAR BUTTON */
	var clearButton = $("#clearButton");

	clearButton.on("click", function () {

		context.clearRect(0, 0, 280, 280);
		context.fillStyle = "white";
		context.fillRect(0, 0, canvas.width, canvas.height);

	});

	/* COLOR SELECTOR */

	$("#colors").change(function () {
		var color = $("#colors").val();
		context.color = color;
	});

	/* LINE WIDTH */

	$("#lineWidth").change(function () {
		context.lineWidth = $(this).val();
	});
}

function renderCanvas() {
	if (drawing) {
		ctx.moveTo(lastPos.x, lastPos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.stroke();
		lastPos = mousePos;
	}
};

(function drawLoop() {
	requestAnimFrame(drawLoop);
	renderCanvas();
})();