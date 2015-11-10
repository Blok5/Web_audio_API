'use strict';
	
(function () {



	window.drow = function () {
		
		var canvas = document.getElementById('tutorial');

		var canvasLeft = canvas.offsetLeft,
			canvasTop = canvas.offsetTop;

			if (canvas.getContext) {

				var ctx = canvas.getContext('2d'),
					screenOfDevice = new Path2D(),
					boxOfDevice = new Path2D();

				boxOfDevice.rect(0, 0, 1000, 500); // Внешний корпус
				screenOfDevice.rect(250, 50, 700, 300); // Экран

				window.drowTriangleOnPlayButton = function  (color) {
					ctx.fillStyle = color;
					ctx.beginPath();
					ctx.moveTo(65, 410);
					ctx.lineTo(65, 440);
					ctx.lineTo(90, 425);
					ctx.fill();
				};

				//Функция для отрисовки стрелки в кнопке Download
				window.drowArrowOnDownloadButton = function  (color) {
					ctx.fillStyle = color;
					ctx.beginPath();
					ctx.moveTo(220, 410);
					ctx.lineTo(220, 430);
					ctx.lineTo(210, 430);
					ctx.lineTo(225, 440);
					ctx.lineTo(240, 430);
					ctx.lineTo(230, 430);
					ctx.lineTo(230, 410);
					ctx.fill();
				};

				//Функция для отрисовки стрелки в кнопке Download
				window.drowSquareOnStopButton = function  (color) {
					ctx.fillStyle = color;
					ctx.fillRect(135, 410, 30, 30);
				};

				//Отрисовка кнопок
				for (var i = 0; i < 3; i++ ) {

					ctx.beginPath();
					ctx.rect(50 + 25 * i + i * 50, 400, 50, 50);
					ctx.stroke();
				}

				//Отрисовка корпуса и экрана
				ctx.stroke(screenOfDevice);
				ctx.stroke(boxOfDevice); 

				//Отрисовка треугольника в кнопке play
				drowTriangleOnPlayButton('black');

				//Отрисовка квадрата в кнопке stop
				drowSquareOnStopButton('black');

				//Отрислвка стрелки в кнопке Download
				drowArrowOnDownloadButton('black');

			} else {
				alert('canvas не поддерживается браузером!');			
			}


			//При событии click
			canvas.addEventListener('click', function (event) {
				var x = event.pageX - canvasLeft,
					y = event.pageY - canvasTop;

				//Событие на кнопку play
				if ( (y > 400 && y < 450) && (x > 50 && x < 100) ) {
					start();					
				} 
				//Событие на кнопку stop
				if ( (y > 400 && y < 450) && (x > 125 && x < 175) ) {
					stop();
				} 
				//Событие на кнопку download
				if ( (y > 400 && y < 450) && (x > 200 && x < 250) ) {
					getData();
				} 
			}, false);


			//При событии mouseover
			canvas.addEventListener("mouseover", function (event) {
				var x = event.pageX - canvasLeft,
					y = event.pageY - canvasTop;

				//Событие на кнопку play
				if ( (y > 400 && y < 450) && (x > 50 && x < 100) ) {					
					
				} 
				//Событие на кнопку stop
				if ( (y > 400 && y < 450) && (x > 125 && x < 175) ) {
					
				} 
				//Событие на кнопку download
				if ( (y > 400 && y < 450) && (x > 200 && x < 250) ) {
					
				} 

			}, false);

			

	};

})();
