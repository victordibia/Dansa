(function (ui) {

	// ----------------------------------------
	// Particle
	// ---------------------------------------- 

	function Particle( x, y, radius ) {
		this.init( x, y, radius );
	}

	Particle.prototype = {

			init: function( x, y, radius ) {

				this.alive = true;

				this.radius = radius || 10;
				this.wander = 0.15;
				this.theta = random( TWO_PI );
				this.drag = 0.92;
				this.color = '#fff';

				this.x = x || 0.0;
				this.y = y || 0.0;

				this.vx = 0.0;
				this.vy = 0.0;
			},

			move: function() {

				this.x += this.vx;
				this.y += this.vy;

				this.vx *= this.drag;
				this.vy *= this.drag;

				this.theta += random( -0.5, 0.5 ) * this.wander;
				this.vx += sin( this.theta ) * 0.1;
				this.vy += cos( this.theta ) * 0.1;

				this.radius *= 0.96;
				this.alive = this.radius > 0.5;
			},

			draw: function( ctx ) {

				ctx.beginPath();
				ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
				ctx.fillStyle = this.color;
				ctx.fill();
			}
	};

	// ----------------------------------------
	// Example
	// ----------------------------------------

	var MAX_PARTICLES = 280;
	var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

	var particles = [];
	var pool = [];

	var demo = Sketch.create({
		container: document.getElementById( 'container' )
	});

	demo.setup = function() {

		// Set off some initial particles.
		var i, x, y;

		for ( i = 0; i < 20; i++ ) {
			x = ( demo.width * 0.5 ) + random( -100, 100 );
			y = ( demo.height * 0.5 ) + random( -100, 100 );
			demo.spawn( x, y );
		}
	};

	demo.spawn = function( x, y ) {

		if ( particles.length >= MAX_PARTICLES )
			pool.push( particles.shift() );

		particle = pool.length ? pool.pop() : new Particle();
		particle.init( x, y, random( 5, 40 ) );

		particle.wander = random( 0.5, 2.0 );
		particle.color = random( COLOURS );
		particle.drag = random( 0.9, 0.99 );

		theta = random( TWO_PI );
		force = random( 2, 8 );

		particle.vx = sin( theta ) * force;
		particle.vy = cos( theta ) * force;

		particles.push( particle );
	};

	demo.update = function() {

		var i, particle;

		for ( i = particles.length - 1; i >= 0; i-- ) {

			particle = particles[i];

			if ( particle.alive ) particle.move();
			else pool.push( particles.splice( i, 1 )[0] );
		}
	};

	demo.draw = function() {

		demo.globalCompositeOperation  = 'lighter';

		for ( var i = particles.length - 1; i >= 0; i-- ) {
			particles[i].draw( demo );
		}
	};



	var TIMER_VALUE  =   localStorage.getItem("pomduration") == null ?  5 : localStorage.getItem("pomduration") ;

	var ax = 0 ;
	var ay = 0 ;
	var az = 0 ;

	var pax = 0 ;
	var pay = 0 ;
	var paz = 0 ;

	var cax = 0 ;
	var cay = 0 ;
	var caz = 0 ;

	window.addEventListener('devicemotion', function(e) {
		ax = (e.accelerationIncludingGravity.x)  ;
		ay = (e.accelerationIncludingGravity.y) ;
		az = (e.accelerationIncludingGravity.z) ; 

	}); 

	var ticker = 0 ;
	var ACCEL_DIFF = 400 ; // increase this to catch wider movements 
	var TIME_DIFF =1  ; //increase this for slower dances 
	var diff = 0 ;

	var tickerInterval = 1000 ; //reduce this to increase the sensitivity of the dance ... wild dance.


	startTimer();

	//dance interval to test if person is dancing 
	var MONITOR_PERIOD = 10 ; // if no dnace for 10 sec, cancel the image else show
	var dancestatus = false ;
	var dancmonend = 0 ;
	var score = 0 ;

	
	
	function resetValues(){
		/*demo = Sketch.create({
			container: document.getElementById( 'container' )
		});
		var diff = 0 ;
		var ticker = 0 ;*/
		score = 0 ;
		 ticker = 0 ;
		 $("#scoreupdate").text("0");
	}
	
	function startTimer(){
		resetValues();
		window.pomTimer = setInterval(function(){pomTicker()}, tickerInterval);
		$("#danceimg").fadeIn("slow");
		
	}

	function pomTicker(){
		ticker++ ;



		cax = ax.toFixed(2) * 100 ;
		cay = ay.toFixed(2) * 100 ;
		caz = az.toFixed(2) * 100 ; 

		if (ticker > 0 && (ticker % TIME_DIFF == 0)) {

			xdiff = Math.abs(pax - cax) ;
			ydiff = Math.abs(pay - cay) ;
			zdiff = Math.abs(paz - caz) ;
			 
			if ( (xdiff > ACCEL_DIFF) || (ydiff > ACCEL_DIFF) || (zdiff > ACCEL_DIFF)){
				vibratedevice(50);
				//$("#update").html( "X spark" + "<br/>" + diff );
				drawspray();
				score =  score*1 + ( (xdiff*1 + ydiff*1 + zdiff*1) / (ACCEL_DIFF * 1.5)) ;
				score = score.toFixed(0);
				setScore(score) ;
				dancmonend = ticker ;
			}else {
				$("#update").html( "" );
			}


			pax = ax.toFixed(2) * 100 ;
			pay = ay.toFixed(2) * 100 ;
			paz = az.toFixed(2) * 100 ; 



			if (ticker - dancmonend > MONITOR_PERIOD){

				if ( dancestatus != false){
					//$("#danceimg").fadeOut("slow", function (){});	
					$("#danceimg").css("opacity","0.5");
					$("#scoreupdate").fadeOut("slow", function (){});


					$("#action").text("Давай ...действуй!");				  
					$("#action").fadeIn("slow", function (){});
				}
				dancestatus = false ;
			}	else {
				if ( dancestatus == false){
					//$("#danceimg").fadeIn("slow", function (){});
					$("#danceimg").css("opacity","1");
					$("#scoreupdate").fadeIn("slow", function (){});

					$("#action").text("");				  
					$("#action").fadeOut("slow", function (){});
				}		 
				dancestatus = true ; 
			}


		} 


		var thewidth =  ($(window).width() - 40) * (((TIMER_VALUE * 60) - ( ticker )) / (TIMER_VALUE * 60) )
		 
		$("#timebar").css("width",  thewidth + "px");


		if (ticker == (TIMER_VALUE * 60)){
			 	 
			stopTimer();
		}

		// X is front back
		// Y is side to side tilt
		// Z checks if watch is vertical .. zero when vertical
	}

	function OverlayCancel() { 
		// $("#maindiv").off(); 
		$("#canceloverlay").off();
		$("#canceloverlay").slideDown( "slow", function() {});
		 
		$("#cancel").off();
		$("#cancel").click(function() {
			$("#canceloverlay").slideUp( "slow", function() {});

			stopTimer() ;
		});

		$("#no").off();
		$("#no").click(function() {
			$("#canceloverlay").slideUp( "slow", function() {});
		});		
	}
	function OverlayFinish() { 
		
		var highscore = localStorage.getItem("highscore") == null ?  0 : localStorage.getItem("highscore") ;
		
		if (highscore < score) {
			$("#highorange").show();
			localStorage.setItem("highscore",score);
		}else{
			$("#highorange").hide();
		}
		
		$("#gamescore").text(score);
		
		// $("#maindiv").off(); 
		$("#gameoverlay").off();
		$("#gameoverlay").slideDown( "slow", function() {});
		 
		$("#gcancel").off();
		$("#gcancel").click(function() {
			$("#gameoverlay").slideUp( "slow", function() {});
			startTimer();
		});

		$("#gno").off();
		$("#gno").click(function() {
			$("#gameoverlay").slideUp( "slow", function() {});
			demo.destroy() ;
			window.history.back();
		});		
	}

	$("#danceimg").off(); 
	$("#danceimg").click(function(e) {
		OverlayCancel();
		
	});


	function vibratedevice (time){
		vibe = localStorage.getItem("vibe") == null ?  "on" : localStorage.getItem("vibe") ;
		if (vibe == "on"){
			navigator.vibrate(time) ;
		}
	}
	function stopTimer(){
		
		clearInterval(window.pomTimer);
		$("#danceimg").hide();
		OverlayFinish();
	}
	function showScore(){
		$("#danceimg").hide();
		$("#scoreupdate").fadeOut("slow", function (){});
		var text = score ;
	}

	function setScore(score){
		if (score > 9999){
			$("#scoreupdate").css( "font-size", "90px" );
			$("#scoreupdate").css( "top", "110px" );
			$("#scoreupdate").text(score);
		}else{
			$("#scoreupdate").text(score);
		}
	}

	function drawspray(){
		max = random( 1, 20 ) ;
		y = random( 100, 300 ) ;
		x = random( 100, 300 ) ;

		for ( j = 0; j < max; j++ ) {
			demo.spawn( x, y );
		}

	}

	var powermon = function(e){
		if(e.keyName == "back")
			demo.destroy() ;
			stopTimer();

		window.history.back();
		tizen.power.release("SCREEN");
		document.removeEventListener('tizenhwkey', powermon);
	};  
	document.addEventListener('tizenhwkey', powermon);
	tizen.power.request("SCREEN", "SCREEN_NORMAL");

})(window.tau);      