(function () {
	'use strict';

	var audioContext, recorder, volumeLevel = 0, volume;

	function __log (text) {
		var li = document.createElement('li');
		li.innerHTML = text;
		logList.appendChild(li);

	}

	function startUserMedia (stream) {
		var input = audioContext.createMediaStreamSource(stream);
		volume = audioContext.createGain();

		volume.gain.value = volumeLevel;

		input.connect(volume);
		volume.connect(audioContext.destination);

		recorder = new Recorder(input);
		__log('Recorder initialized');
	}

	function changeGain (value) {
		if (!volume) return;
		volumeLevel = value;
		volume.gain.value = value;
		__log(volume.gain.value);
		
		document.getElementById('showRangeValue').innerHTML = value * 100 + '%';
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
    	    var audio = document.createElement('audio');
      		var href = document.createElement('a');

      		audio.controls = true;
      		audio.src = url;
      		href.href = url;
      		href.download = new Date().toISOString() + '.wav';
      		href.innerHTML = 'Скачать';
      		href.className = 'btn';
      		href.style.width = "70px";
      		li.appendChild(audio);
      		li.appendChild(href);
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
	window.__log = __log;
	window.changeGain = changeGain;
})();