
$(window).load(function(){
	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
	
	
	$('.contents').on("click", function(){
		$('#textbox').html($('#textbox').html() == "Basic" ? "Sample" : "Basic");				
	});
});