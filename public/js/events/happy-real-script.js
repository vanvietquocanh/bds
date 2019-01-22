jQuery(document).ready(function($) {
	$(".clickShowDetails").click(function(event) {
		window.open(`/chi-tiet?area=${$(this).attr("id")}`)
	});
	$("#showmap").click(function(event) {
		if($("#map").css("height")==="0px"){
			$("#map").css("height","500px")
		}else{
			$("#map").css("height","0px")
		}
	});
});