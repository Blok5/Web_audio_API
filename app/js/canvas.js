(function () {
	'use strict';


	window.drow = function () {
		
		var canvas = document.getElementById('tutorial');

			if (canvas.getContext) {

				var ctx = canvas.getContext('2d');

				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, 700, 200); // Экран


			} else {
				alert('canvas не поддерживается браузером!');			
			}

	};

})();
