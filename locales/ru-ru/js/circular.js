(function() {
		
var page = document.getElementById( "MaincircularSectionchangerPage" ),
	changer = document.getElementById( "circularSectionchanger" ),
	sectionChanger, idx=1;

page.addEventListener( "pageshow", function() {
	// make SectionChanger object
	    sectionChanger = new tau.SectionChanger(changer, {
		circular: true,
		orientation: "horizontal",
		scrollbar: "tab"
	});
});

page.addEventListener( "pagehide", function() {
	// release object
	sectionChanger.destroy();
});
})();
