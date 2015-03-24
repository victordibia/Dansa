( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName == "back" ) {
			var page = document.getElementsByClassName( 'ui-page-active' )[0],
				pageid = page ? page.id : "";
			if( pageid === "MaincircularSectionchangerPage" ) {
				
				tizen.application.getCurrentApplication().exit();
				//document.getElementById('2btnPopup').click();
				
				//window.history.back();
			} else {
				window.history.back();
			}
		}
	} );
} () );
