jQuery(document).ready(function($) {
	function postReq(method, path, body, element) {
		$[`${method}`](path, body, function(res, textStatus, xhr) {
			if(res==="success"){
				element.parent().parent().remove()
			}else{
				alert('Error!');
			}
		});
	}
	function fnExcelReport(){
	    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
	    var textRange; var j=0;
	    tab = document.getElementById('tableEmail');
	    for(j = 0 ; j < tab.rows.length ; j++){
	        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
	    }
	    tab_text=tab_text+"</table>";
	    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");
	    tab_text= tab_text.replace(/<img[^>]*>/gi,"");
	    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, "");
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE "); 
	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
	    {
	        txtArea1.document.open("txt/html","replace");
	        txtArea1.document.write(tab_text);
	        txtArea1.document.close();
	        txtArea1.focus(); 
	        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
	    }  
	    else
	        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

	    return (sa);
	}
	$(".btn-danger").click(function(event) {
		postReq("post", "/removeemail",{id:$(this).attr('class').match(/[a-f\d]{24}/)[0]}, $(this))
	});
	$("#excel").click(function(event) {
		fnExcelReport()
	});
});