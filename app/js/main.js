(function () {
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

	window.startIndicator = startIndicator;

})();