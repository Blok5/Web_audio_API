var main = (function () {
	'use strict';

	/**
	* Animates record indicator"
	*/
	function startIndicator () {		
		
		var indic = document.getElementById('recordIndicator');
		var stopBtn = document.getElementById('stopBtn');

		var intervalID = setInterval(function () {
			if (indic.style.background === 'red') {
				indic.style.background = '';
			} else {
				indic.style.background = 'red';
			}
		}, 1000);

		stopBtn.addEventListener('click', function () {
			clearInterval(intervalID);
			indic.style.background = '';
		}, false);
	}

	/**
	* Drawes recorded data
	* @params {number} width - width of draw Canvas
	* @params {number} height - height of draw canvas
	* @params {CanvasRenderingContext2D} drowCtx - context of draw canvas
	* @params {Array} data - Array with recorded data
	*/	
	function drawRecorderData(width, height, drawCtx, data) {	    
		    var amp = height / 2;
			var step = Math.ceil( data.length /  width) || 1;

			drawCtx.fillStyle = "black";
			drawCtx.fillRect(0, 0, 700, 200); 

			drawCtx.fillStyle = 'rgb(0, 128, 128)';


		    for(let i=0; i < width; i++) {

		        var min = 1.0;
		        var max = -1.0;

		        for (let j=0; j < step; j++) {
		            var datum = data[(i * step) + j]; 

		            if ( datum < min ) {
		                min = datum;
		            }
		            if ( datum > max ) {
		                max = datum;
		            }
		        }

		        drawCtx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
		    }
	}

	return {
		drawRecorderData: drawRecorderData,
		startIndicator: startIndicator
	}

})();