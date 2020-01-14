// (function () {
// 	var canvas = document.querySelector("#canvas");
// 	var context = canvas.getContext("2d");
// 	context.beginPath();
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

// 	function debug() {
// 		/* CLEAR BUTTON */
// 		var clearButton = $("#clearButton");

// 		clearButton.on("click", function () {

// 			context.clearRect(0, 0, 280, 280);
// 			context.fillStyle = "white";
// 			context.fillRect(0, 0, canvas.width, canvas.height);

// 		});

// 		/* COLOR SELECTOR */

// 		$("#colors").change(function () {
// 			var color = $("#colors").val();
// 			context.color = color;
// 		});

// 		/* LINE WIDTH */

// 		$("#lineWidth").change(function () {
// 			context.lineWidth = $(this).val();
// 		});
// 	}
// }());
(function () {

	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimaitonFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	// Set up the canvas
	var canvas = document.querySelector("#canvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	canvas.width = 280;
	canvas.height = 280;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.color = "black";

	ctx.lineWidth = 10;
	ctx.lineJoin = ctx.lineCap = 'round';

	// Set up the UI
	var clearBtn = $("#clearButton");
	clearBtn.on("click", function () {
		clearCanvas();
	});

	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x: 0, y: 0 };
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos = mousePos;
		}
	}

	function clearCanvas() {
		// canvas.width = canvas.width;
		ctx.beginPath();
		ctx.clearRect(0, 0, 280, 280);
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.color = "black";

		ctx.lineWidth = 10;
		ctx.lineJoin = ctx.lineCap = 'round';
	}

	// Allow for animation
	(function drawLoop() {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();

})();