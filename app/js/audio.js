(function () {
	'use strict';

	var audioContext = null, /** @define {MediaStreamAudioSourceNode=} */
		recorder = null, 	/** @define {Recorder=} */
		volumeLevel = 0, //* @define {number} */
		analyser = null, //* @define {AnaluserNode} */
		bufferLength = null, //* @define {number} */
		dataArray = null, //* @define {Uint8Array} */
		volume = null,  //* @define {number=} */
		drawVisual = null; //* @define {number} */


	/**
	* Displays information in div id="logList"
	* @param {string} text - the text which will display
	*/
	function __log (text) {
		var logList = document.getElementById('logList');
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

		analyser = audioContext.createAnalyser();
		canvasDrawer.init();

		volume = audioContext.createGain();
		volume.gain.value = volumeLevel;

		input.connect(volume);
		volume.connect(analyser);
		analyser.connect(audioContext.destination);

		recorder = new Recorder(input);

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
	function initAudio () {

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
	}

	/**
	* main Drower which include different functions
	*/
	var canvasDrawer = (function() {
		var ctx = null,
			canvas = null;

		/**
		* canvas inicialization 
		*/	
		var init = function () {
			canvas = document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			canvas.width = 700;
			canvas.height = 200;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height); 
		};	

		/**
		* drowes waveform
		*/
		var drawWaveform = function() {
			var x = 0; //* define {number} - position for drowing segments /*

			analyser.fftSize = 2048;
			bufferLength = analyser.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			drawVisual = requestAnimationFrame(drawWaveform);
			analyser.getByteTimeDomainData(dataArray);

			ctx.fillStyle = 'rgb(200, 200, 200)';
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgb(0,0,0)';
			ctx.beginPath();

			var sliceWidth = canvas.width / bufferLength; // offset the x-axis

			for(let i = 0; i < bufferLength; i++) {
		   
		        var v = dataArray[i] / 128.0;
		        var y = v * canvas.height / 2;

		        if (i === 0) {
		          ctx.moveTo(x, y);
		        } else {
		          ctx.lineTo(x, y);
		        }

		        x += sliceWidth;
		    }

		    ctx.lineTo(canvas.width, canvas.height/2);
     		ctx.stroke();				
		};

		/**
		* drowes a frequency bar graph
		*/
		var drawBarGraph = function () {
			var x = 0;	//* define {number} - position for drowing segments /*

			analyser.fftSize = 256;
			bufferLength = analyser.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			drawVisual = requestAnimationFrame(drawBarGraph);

			analyser.getByteFrequencyData(dataArray);
			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var barWidth = (canvas.width / bufferLength ) * 2.5;
			var barHeight = null;

			for(let i = 0; i < bufferLength; i++) {
		        barHeight = dataArray[i];

		        ctx.fillStyle = 'rgb(0, ' + (barHeight + 100) + ', 128)';
		        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

		        x += barWidth + 1;
		    }
		    
		};

		return {
			init : init,
			drawWaveform: drawWaveform,
			drawBarGraph: drawBarGraph
		};

	})();

	document.addEventListener('DOMContentLoaded', function () {
		initAudio();

		document.getElementById('stopBtn').onclick = function () {
			stopRecording(this);	
		};

		document.getElementById('startBtn').onclick = function () {
			startRecording(this);
			startIndicator();
		};

		document.getElementById('gainRange').onchange = function () {
			changeGain(this.value);	
		};

		document.getElementById('bar').onclick = function () {
			cancelAnimationFrame(drawVisual);
			canvasDrawer.drawBarGraph();
		};

		document.getElementById('wave').onclick = function () {
			cancelAnimationFrame(drawVisual);
			canvasDrawer.drawWaveform();
		};

	});

})();