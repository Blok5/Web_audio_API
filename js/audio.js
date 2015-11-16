'use strict';

(function () {
	
	var source, audioContext;

	window.record = function () {

			var audioCtx = window.AudioContext || window.webkitAudioContext;
			audioContext = new audioCtx();

			navigator.getUserMedia = navigator.getUserMedia ||
	                          navigator.webkitGetUserMedia ||
	                          navigator.mozGetUserMedia ||
	                          navigator.msGetUserMedia;

	        

			navigator.getUserMedia({audio: true}, function (stream) { 
				source =  audioContext.createMediaStreamSource(stream);
				console.log(audioContext.state);
				source.connect(audioContext.destination);
			}, function (e) {
				console.log(e);
			});

		
	};

	window.stop = function () {
		audioContext.close().then(function () {
			document.getElementById("stopBtn").setAttribute('disabled','disabled');
			document.getElementById("startBtn").removeAttribute('disabled');
			console.log(audioContext.state);	
		});
	};

	
	
	window.start = function () {
		document.getElementById("startBtn").setAttribute('disabled','disabled');
		document.getElementById("stopBtn").removeAttribute('disabled');
		console.log('play!');		
		source.start();	
	};



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





})();