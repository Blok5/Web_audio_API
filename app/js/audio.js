(function () {
	'use strict';

	var audioContext, recorder;

	function __log (text) {
		var li = document.createElement('li');
		li.innerHTML = text;
		logList.appendChild(li);

	}

	function startUserMedia (stream) {
		var input = audioContext.createMediaStreamSource(stream);
		input.connect(audioContext.destination);

		recorder = new Recorder(input);
		__log('Recorder initialized');
	}

	function startRecording (button) {
		recorder && recorder.record();
		button.disabled = true;
		button.nextElementSibling.disabled = false;
		__log('Recording...');
	}

	function stopRecording (button) {
		recorder && recorder.stop();
		button.disabled = true;
		button.previousElementSibling.disabled = false;
		__log('Recording was stopped');

		createDownloadLink();
		recorder.clear();
	}

	function createDownloadLink () {
		recorder && recorder.exportWAV(function (blob) {
			var url = URL.createObjectURL(blob);
			var li = document.createElement('li');
    	    var au = document.createElement('audio');
      		var hf = document.createElement('a');

      		au.controls = true;
      		au.src = url;
      		hf.href = url;
      		hf.download = new Date().toISOString() + '.wav';
      		hf.innerHTML = 'Скачать';
      		hf.className = 'btn';
      		li.appendChild(au);
      		li.appendChild(hf);
      		recordingslist.appendChild(li);

      		__log('Link was created');
    	});

	}


	window.onload = function () {

		var audioCtx = window.AudioContext || window.webkitAudioContext;
		audioContext = new audioCtx();

		__log('getUserMedia...');

		navigator.getUserMedia = navigator.getUserMedia ||
	    	                     navigator.webkitGetUserMedia ||
	        	                 navigator.mozGetUserMedia ||
	            	             navigator.msGetUserMedia;
	        
		navigator.getUserMedia({audio: true}, startUserMedia, function (e) {
			__log(e);
		});
	};

	window.startRecording = startRecording;
	window.stopRecording = stopRecording;

})();