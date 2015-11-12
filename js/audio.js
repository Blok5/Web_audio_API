'use strict';

(function () {

	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioCtx = new AudioContext();
	var source;


	window.getData = function() {
		
		var xhr = new XMLHttpRequest();

		xhr.open('GET','http://localhost:3000/music/ex.mp3',true);
		xhr.responseType = 'arraybuffer';

		xhr.onprogress = function (event) {
			console.log("Загружено: " + event.loaded + " / " + event.total);
		};

		xhr.onload = function () {
			var audioData = xhr.response;
			source = audioCtx.createBufferSource();

				audioCtx.decodeAudioData(audioData, function (buffer) {
					source.buffer = buffer;
					console.log(source.buffer);
					source.connect(audioCtx.destination);
					
				});
			};

		xhr.send();
  
	}

	window.start = function () {
		if (source) {
			source.start(0);
		} else { 
			alert("Выберите песню!");
		}
	};

	window.stop = function () {
		if (source) {
			source.stop(0);
		} else {
			alert("Выберите песню!");
		}	
	};

})();