(function () {
	var canvas = document.querySelector("#canvas");
	var context = canvas.getContext("2d");
	context.beginPath();
	canvas.width = 280;
	canvas.height = 280;

	var Mouse = { x: 0, y: 0 };
	var lastMouse = { x: 0, y: 0 };
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.color = "black";

	context.lineWidth = 10;
	context.lineJoin = context.lineCap = 'round';

	debug();

	canvas.addEventListener("mousemove", function (e) {
		lastMouse.x = Mouse.x;
		lastMouse.y = Mouse.y;

		Mouse.x = e.pageX - this.offsetLeft;
		Mouse.y = e.pageY - this.offsetTop;

	}, false);

	canvas.addEventListener("mousedown", function (e) {
		canvas.addEventListener("mousemove", onPaint, false);

	}, false);

	canvas.addEventListener("mouseup", function (e) {
		canvas.removeEventListener("mousemove", onPaint, false);

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

	var onPaint = function (e) {
		e.preventDefault();
		e.stopPropagation();
		context.lineWidth = context.lineWidth;
		context.lineJoin = "round";
		context.lineCap = "round";
		context.strokeStyle = context.color;

		context.beginPath();
		context.moveTo(lastMouse.x, lastMouse.y);
		context.lineTo(Mouse.x, Mouse.y);
		context.closePath();
		context.stroke();
	};

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
}());
