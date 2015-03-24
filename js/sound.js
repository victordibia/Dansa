$(window).load(function(){

	var ctx = new webkitAudioContext()   ;
	var  url = 'jesus.mp3'     ;
	var  audio = new Audio(url)   ;
	var processor = ctx.createJavaScriptNode(2048, 1, 1)   ;


	audio.addEventListener('canplaythrough', function(){
		source = ctx.createMediaElementSource(audio) ;
		source.connect(processor)  ;
		source.connect(ctx.destination) ;
		processor.connect(ctx.destination) ;
		audio.play()  ;
	}, false);

	// loop through PCM data and calculate average
	// volume for a given 2048 sample buffer
	processor.onaudioprocess = function(evt){
		var input = evt.inputBuffer.getChannelData(0)   ;
		var  len = input.length      ;
		var  total = i = 0  ;
		var  rms ;
		while ( i < len ) total += Math.abs( input[i++] )
		rms = Math.sqrt( total / len )  ;
		$( "#meter" ).html( ( rms * 100 ) + '%') ;
		meter.style.width = ( rms * 100 ) + '%' ;
	}

	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
	});

});