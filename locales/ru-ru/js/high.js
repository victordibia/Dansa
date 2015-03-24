(function (ui) {

	var highscore = localStorage.getItem("highscore") == null ?  0 : localStorage.getItem("highscore") ;
	//$("#highscore").html(highscore) ;

	 if (highscore > 9999){
		 $("#highscore").css( "font-size", "90px" );
		 $("#highscore").css( "top", "110px" );
		 $("#highscore").text(highscore);
	 }else{
		 $("#highscore").text(highscore);
	 }

	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back")
			window.history.back();
	});


})(window.tau);      