jQuery(document).ready(function($) {
	$("body").on("contextmenu",function(e){
		e.preEventDefault();
    });
});