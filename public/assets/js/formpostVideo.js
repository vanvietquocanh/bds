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
	function initEventVideo() {
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
	}
	function acitveDropGuest(path, data, btn) {
		$.post(path, data, function(res, textStatus, xhr) {
			if(res==="success"){
				if(path.indexOf("remove")!==-1){
					btn.parent().parent().remove()
				}else{
					if (btn.attr("class").indexOf("btn-warning")!==-1) {
						btn.removeClass("btn-warning")
						btn.addClass("btn-success")
						btn.children().removeClass('fa-lock')
						btn.children().addClass('fa-unlock')
					}else{
						btn.removeClass("btn-success")
						btn.addClass("btn-warning")
						btn.children().removeClass('fa-unlock')
						btn.children().addClass('fa-lock')
					}
				}
			}else{
				alert(res)
			}
		});
	}
	function initEventDropActive(path) {
		$(".btn").click(function(event) {
			if($(this).attr("class").indexOf("btn-danger")!==-1){
				acitveDropGuest(`${path}/remove`, {id : $(this).attr("class").split("btn ")[1]}, $(this))
			}else if($(this).attr("class").indexOf("btn-warning btn ")!==-1||$(this).attr("class").indexOf("btn-success btn ")!==-1){
				acitveDropGuest(`${path}/update`, 
					{
						"id" 	: $(this).attr("class").split("btn ")[1],
						"status": ($(this).attr("class").split(" btn")[0]==="btn-warning")?"active":"inactive"
					}, $(this))
			}
		});
	}
	if(window.location.pathname==="/admin/can-mua-happy-real"){
		initEventDropActive("/area-guest");
	}else if(window.location.pathname==="/admin/can-ban-happy-real"){
		initEventDropActive("/sale-area-guest");
	}else{
		initEventVideo();
	}
});