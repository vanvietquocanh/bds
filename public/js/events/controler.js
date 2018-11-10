jQuery(document).ready(function($) {
	// $("body").on("contextmenu",function(e){
		// e.preEventDefault();
  //   });
    var button = "<div id='GoTop' class='gotop fa'></div>";
	var bodyPage = $('body');
	bodyPage.append(button);
	window.onscroll = function() {scrollFunction()};
	function scrollFunction() {
	    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        document.getElementById("GoTop").style.display = "block";
	    } else {
	        document.getElementById("GoTop").style.display = "none";
	    }
	}
	function valEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   		return re.test(String(email).toLowerCase());
	}
	function topFunction() {
	    document.body.scrollTop = 0;
	    document.documentElement.scrollTop = 0;
	}
	$("#GoTop").click(function(event) {
		topFunction();
	});
	$("#val-email").keydown(function(event) {
		if(event.keyCode===13, event.key==="Enter"){
			$("#receive-email").click();
		}
	});
	$("#receive-email").click(function(event) {
		$("#receive-email").unbind('click')
		$("#val-email").unbind('keydown')
		if(valEmail($("#val-email").val())){
			$.post('/receive-email', {email: $("#val-email").val()}, function(data, textStatus, xhr) {
				$(".popup-alert-container-content-title").text("Cảm ơn quý khách đã tin tưởng chúng tôi!")
				$(".popup-alert").fadeIn('slow');
				$("#receive-email").hide('slow')
				$("#val-email").hide('slow')
				setTimeout(function() {
					$("#close-alert").click();
				}, 2000);
			});
		}else{
			$("#val-email").val('')
			$("#val-email").addClass('errorInput')
			$("#val-email").attr('placeholder',"Vui lòng nhập đúng định dạng Email")
		}
	});
	$("#close-alert").click(function(event) {
		$("#close-alert").unbind('click');
		$(".popup-alert").hide('slow');
	});
});