$(window).load(function(){

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
	})();

	 
	for (var a=[],i=-5;i<15;++i) { a[i]=i; }
	for (var b=[],i=-15;i<15;++i) { b[i]=i;}
	var ax = [0,0,0,0,0,0,0] ; ay = [0,0,0,0,0,0,0] ; az = [0,0,0,0,0,0,0] ;
	
	counter = 0 ;
	window.addEventListener('devicemotion', function(e) {
		ax[counter % ax.length] = e.accelerationIncludingGravity.x * 10;
		ay[counter % ax.length] = -e.accelerationIncludingGravity.y  * 10;
		
		//console.log(ax[counter % ax.length]) ;
		counter++;
		launchGraph()
	}); 
	
	window.addEventListener('deviceorientation', function(e) {
		ax[counter % ax.length] = e.gamma;
		ay[counter % ax.length] = -e.beta;
		
		//console.log(ax[counter % ax.length]) ;
		counter++;
		launchGraph()
	}); 

	// http://stackoverflow.com/questions/962802#962890
	function shuffle(array) {
		var tmp, current, top = array.length;
		if(top) while(--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
		return array;
	} 
	
	function launchGraph(){
		//requestAnimationFrame(launchGraph);
		myTimer();
	}

	function myTimer() {
		var lineChartData = {

				labels : [""," "," "," "," "," "," "],
				datasets : [
				            {
				            	fillColor : "rgba(220,220,220,0.5)",
				            	strokeColor : "rgba(220,220,220,1)",
				            	pointColor : "rgba(220,220,220,1)",
				            	pointStrokeColor : "#fff",
				            	data : ax
				            },
				            {
				            	fillColor : "rgba(151,187,205,0.5)",
				            	strokeColor : "rgba(151,187,205,1)",
				            	pointColor : "rgba(151,187,205,1)",
				            	pointStrokeColor : "#fff",
				            	data : ay
				            }
				            ]

		}
		var pieOptions = {
				scaleShowLabels:false ,
				animation : false,  // Edit: correction typo: from 'animated' to 'animation'
		}


		var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, pieOptions);
	}



	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
	});

});