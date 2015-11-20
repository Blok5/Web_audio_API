(function () {
	'use strict';

	var audioContext, /** @define {MediaStreamAudioSourceNode=} */
		recorder, 	/** @define {Recorder=} */
		volumeLevel = 0, //* @define {number} */
		volume;  //* @define {number=} */

	/**
	* Displays information in div id="logList"
	* @param {string} text - the text which will display
	*/
	function __log (text) {
		var li = document.createElement('li');
		li.innerHTML = text;
		logList.appendChild(li);

	}

	/**
	*  Creates routing nodes
	*  @params {MediaStream} stream - stream of audio data
	*/
	function startUserMedia (stream) {
		var input = audioContext.createMediaStreamSource(stream);

		volume = audioContext.createGain();

		volume.gain.value = volumeLevel;

		input.connect(volume);
		volume.connect(audioContext.destination);

		recorder = new Recorder(input);
		__log(Object.prototype.toString.call(recorder));
		__log('Recorder initialized');
	}

	/**
	*  Changes value of monitor volume 
	*  @params {number} value - the value which will set 
	*/
	function changeGain (value) {
		if (!volume) { return };
		volumeLevel = value;
		volume.gain.value = value;
		__log(volume.gain.value);
		
		document.getElementById('showRangeValue').innerHTML = value * 100 + '%';
	}

	/**
	*  Starts recording
	*  @params {HTMLElement} button - HTMLElement which will use for set properties
	*/
	function startRecording (button) {
		recorder && recorder.record();
		button.disabled = true;
		button.nextElementSibling.disabled = false;
		__log('Recording...');
	}

	/**
	*  Stops recording
	*  @params {HTMLElement} button - HTMLElement which will use for set properties
	*/
	function stopRecording (button) {
		recorder && recorder.stop();
		button.disabled = true;
		button.previousElementSibling.disabled = false;
		__log('Recording was stopped');

		createDownloadLink();
		recorder.clear();
	}

	/**
	*  Creates download link after recording
	*/
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

	/**
	* "onload" event handle
	* Checks getUserMedia using possibility 
	*/
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