jQuery(document).ready(function($) {
	function testInputNull(link){
		return /(https?:\/\/[^\s]+)/g.test(link);
	}
	function postForm() {
		var invalid = [];
		$.each($("#form-group").children().children("input"), function(index, val) {
			if($(this).attr("id")!=="idVideo"){
				if($(this).val()===""){
					invalid.push($(this));
					var placeholder = $(this).attr("placeholder");
					var element = $(this)
					$(this).attr("placeholder","Vui lòng nhập!!");
					$(this).addClass('null');
					setTimeout(function() {
						element.attr("placeholder", placeholder);
						element.removeClass('null');
					}, 1000);
				}
			}
		});
		if(invalid.length===0&&testInputNull($("#linkVideo").val())){
			var data = {
				videoname : $("#videoName").val(),
				linkvideo : $("#linkVideo").val(),
				id 		  : $("#idVideo").val(),
				timezone  : Date.now()

			}
			$("#idVideo").val("")
			$.post('/linkvideo', data, function(res, textStatus, xhr) {
				if(res==="success"){
					let html = `<tr id="">
                                    <th scope="row">${$("tbody").children().length+1}</th>
                                    <td class="videoName">${$("#videoName").val()}</td>
                                    <td class="videoLink">${$("#linkVideo").val()}</td>
                                    <td>
                                        <button type="button" class="btn-primary btn" disabled>
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button type="button" class="btn-danger btn" disabled>
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>`;
					$("#videoName").val("");
					$("#linkVideo").val("");
					$(`#${data.id}`).remove();
					$("tbody").append(html)
				}else{
					alert(res)
				}
			});
		}else{
			$("#linkVideo").val("");
			$("#linkVideo").attr("placeholder","Vui lòng nhập đúng định dạng link!!")
			$("#linkVideo").addClass('null');
		}
	}
	$(".fa-trash").parent().click(function(event) {
		if(confirm("Bạn chắc chắn muốn xoá?")){
			var elementRemove = $(this);
			$.post('/removevideo', {id: $(this).attr("class").split(" btn ")[1]}, function(res, textStatus, xhr) {
				if(res==="success"){
					elementRemove.parent().parent().remove();
				}else{
					alert(res);
				}
			});
		}
	});
	$(".fa-edit").parent().click(function(event) {
		var elementEdit = $(this);
		$("#videoName").val(elementEdit.parent().prev().prev().text())
		$("#linkVideo").val(elementEdit.parent().prev().text())
		$("#idVideo").val(elementEdit.attr("class").split(" btn ")[1])
	});
	$("#submit").click(function(event) {
		postForm();
	});
	$("#videoName").keydown(function(event) {
		if(event.key==="Enter"||event.keyCode===13){
			$("#submit").click();
		}
	});
	$("#linkVideo").keydown(function(event) {
		if(event.key==="Enter"||event.keyCode===13){
			$("#submit").click();
		}
	});
});