jQuery(document).ready(function($) {
	$("#submit").click(function(event) {
		var data = {
			videoname : $("#videoName").val(),
			linkvideo : $("#linkVideo").val()

		}
		$.post('/linkvideo', data, function(res, textStatus, xhr) {
			if(res==="success")
			{
				$("#videoName").val("");
				$("#linkVideo").val("")
			}else{
				$.each($("#form-group").children().children("input"), function(index, val) {
					if($(this).val()==="")
						{
							$(this).attr("placeholder","Chưa nhập giá trị");
							$(this).addClass('null');
						}
				});
			}
		});
	});
});