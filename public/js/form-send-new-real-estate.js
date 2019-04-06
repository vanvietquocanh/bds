$(document).ready(function () {
    $("#submit").click(e=>{
        var arrValid = 0;
        for (let i = 0; i < $(this).find("input").length; i++) {
            if(!($(this).find("input")[i].checkValidity())){
                arrValid++;
            }
        }
        if(arrValid===0){
            $("#date").val(Date.now())
            $("#formAddArea").attr("action",window.location.pathname.split("admin").join("new-area"))
            $("#waitHtml").removeClass("d-none");
            $("#formAddArea").submit();  
        }
    })
    $("input[type='file']").change(function(event) {
        if(this.files[0].size>=500000){
            alert("Vui lòng chọn ảnh nhỏ hơn 500KB");   
            $(this).val("")
            $(this).css("border","1px solid red")
        }
    });
    function editBTN(id, element){
        $.post(window.location.pathname.split("admin").join("find"), id, (res, stt, xhr)=>{
            if(typeof res==="object"){
                returnValueInput(res)
                $("#submit").unbind('click');
                $("#destroy").remove();
                $("#submit").text("Save").attr("id","btn-save");
                $("#form-add").append(`<button type="submit" id="destroy" class="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-5">Hủy</button>`)
                $("#destroy").click(function(event) {
                    initEventCreateArea();
                    $("#destroy").unbind('click');
                    $("#destroy").remove();
                })
                $("#btn-save").click(function(event) {
                    $("#btn-save").unbind('click')
                    let data = createData(id.id)
                    $("#destroy").unbind('click');
                    $("#destroy").remove();
                    $("#btn-save").text("Gửi").attr("id","submit");
                    submitForm(createData(id.id), "update", successUpdate(data))
                    initEventCreateArea();
                });
            }else{
                alert("error");
                window.location.href = window.location.href;
            }
        })
    }
    function dropBTN(id, element) {
        $.post(window.location.pathname.split("admin").join("destroy"), id, (res, stt, xhr)=>{
            if(res==="success"){
                element.parent().parent().remove();
            }else{
                alert(res)
            }
        })
    }
    $(".btn").click(e=>{
        if($(e.currentTarget).attr("class").split(" ").length===3){
            if($(e.currentTarget).attr("class").indexOf("danger")===-1){
                editBTN({id : $(e.currentTarget).attr("class").split("btn ")[1]}, $(e.currentTarget));
            }else {
                dropBTN({id : $(e.currentTarget).attr("class").split("btn ")[1]}, $(e.currentTarget))
            }
        }
    })
});