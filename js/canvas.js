'use strict';
	
(function () {



	window.drow = function () {
		
		var canvas = document.getElementById('tutorial');

		var canvasLeft = canvas.offsetLeft,
			canvasTop = canvas.offsetTop;

			if (canvas.getContext) {

				var ctx = canvas.getContext('2d');

				ctx.fillStyle = "#000";
				ctx.fillRect(0, 0, 700, 200); // Экран

				window.drowTriangleOnPlayButton = drowTriangleOnPlayButton;
				window.drowArrowOnDownloadButton = drowArrowOnDownloadButton;
				window.drowSquareOnStopButton = drowSquareOnStopButton;


			} else {
				alert('canvas не поддерживается браузером!');			
			}

	};

})();
