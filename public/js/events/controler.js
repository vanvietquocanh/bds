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
	getPagination('#table-pagination');
	function getPagination (table){

        		var lastPage = 1 ;
        		console.log($("table")); 
        	// $('#maxRows').attr()
		  $('#maxRows').on('keyup',function(evt){
		  	//$('.paginationprev').html('');						// reset pagination 


		lastPage = 1 ; 
         $('.pagination').find("li").slice(1, -1).remove();
		  	var trnum = 0 ;									// reset tr counter 
		  	var maxRows = parseInt($(this).val());			// get Max Rows from select option

		  	if(maxRows == 5000 ){

		  		$('.pagination').hide();
		  	}else {
		  		
		  		$('.pagination').show();
		  	}

		  	var totalRows = $(table+' tbody tr').length;		// numbers of rows 
			 $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
			 	trnum++;									// Start Counter 
			 	if (trnum > maxRows ){						// if tr number gt maxRows
			 		
			 		$(this).hide();							// fade it out 
			 	}if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
			 });											//  was fade out to fade it in 
			 if (totalRows > maxRows){						// if tr total rows gt max rows option
			 	var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
			 												//	numbers of pages 
			 	for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
			 	$('.pagination #prev').before('<li data-page="'+i+'">\
								      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
								    </li>').show();
			 	}											// end for i 
			} 												// end if row count > max rows
			$('.pagination [data-page="1"]').addClass('active'); // add active class to the first li 
			$('.pagination li').on('click',function(evt){		// on click each page
				evt.stopImmediatePropagation();
				evt.preventDefault();
				var pageNum = $(this).attr('data-page');	// get it's number

				var maxRows = parseInt($('#maxRows').val());			// get Max Rows from select option

				if(pageNum == "prev" ){
					if(lastPage == 1 ){return;}
					pageNum  = --lastPage ; 
				}
				if(pageNum == "next" ){
					if(lastPage == ($('.pagination li').length -2) ){return;}
					pageNum  = ++lastPage ; 
				}

				lastPage = pageNum ;
				var trIndex = 0 ;							// reset tr counter
				$('.pagination li').removeClass('active');	// remove active class from all li 
				$('.pagination [data-page="'+lastPage+'"]').addClass('active');// add active class to the clicked 
				// $(this).addClass('active');					// add active class to the clicked 
				 $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
				 	trIndex++;								// tr index counter 
				 	// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
				 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
				 		$(this).hide();		
				 	}else {$(this).show();} 				//else fade in 
				 }); 										// end of for each tr in table
					});										// end of on click pagination list

		}).val(5).change();

												// end of on select change 
		 
    
  
								// END OF PAGINATION 
	}	
});