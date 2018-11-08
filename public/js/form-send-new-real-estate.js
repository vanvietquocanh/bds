$(document).ready(function () {
    function valid(data){
        var valids = [];
        for (var i = 0; i < Object.values(data).length; i++) {
            if(Object.values(data)[i]===""){
                valids.push(Object.keys(data)[i])
            }
        }
        return valids;
    }
    function alertError(dataCheck) {
        $.each(dataCheck, function(index, val) {
            if(val==="Hướng"){
                $(`[name='${val}']`).children(":first").text(`Vui lòng chọn ${val}`)
                $(`[name='${val}']`).addClass('null')
            }else{
                $(`[name='${val}']`).attr("placeholder", `Vui lòng nhập ${val}`).addClass('null')
            }
        });
    }
    function returnValueInput(data) {
        $("#landNumber").val((typeof data==="string")?data:data["Lô số"])
        $("#location").val((typeof data==="string")?data:data["Vị trí"])
        $("#area").val((typeof data==="string")?data:data["Khu"])
        $("#typeProject").val((typeof data==="string")?data:data["Loại dự án"])
        $("#price").val((typeof data==="string")?data:data["Giá"])
        $("#acreage").val((typeof data==="string")?data:data["Diện tích"])
        $("#direction").val((typeof data==="string")?data:data["Hướng"])
        $("#details").val((typeof data==="string")?data:data["Chi tiết"])
    }
    function createData() {
        return {
            "Diện tích" : $("#acreage").val(),
            "Lô số"     : $("#landNumber").val(),
            "Vị trí"    : $("#location").val(),
            "Khu"       : $("#area").val(),
            "Loại dự án": $("#typeProject").val(),
            "Giá"       : $("#price").val(),
            "Hướng"     : $("#direction").val(),
            "Chi tiết"  : $("#details").val()
        }
    }
    $("#submit").click(e=>{
        let data = createData()
        if(valid(data).length>0){
            alertError(valid(data))
        }else{
            $.each(data, function(index, val) {
                $(`[name='${index}']`).removeClass('null')
            });
            $.post(window.location.pathname.split("admin").join("new-area"), data, function(res, textStatus, xhr) {
                if(res==="success"){
                    let htmlNewArea =   `<tr>
                                            <th scope="row">${$("tbody").children("tr").length+1}</th>
                                            <td>${data["Lô số"]}</td>
                                            <td>${data["Vị trí"]}</td>
                                            <td>${data["Loại dự án"]}</td>
                                            <td>${data["Giá"]}</td>
                                            <td>${data["Hướng"]}</td>
                                            <td>${data["Diện tích"]}</td>
                                            <td>${data["Khu"]}</td>
                                            <td>
                                                <button disabled type="button" class="btn-primary btn 5be47af1405d9709d4d7801a">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                <button disabled type="button" class="btn-danger btn 5be47af1405d9709d4d7801a">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>`
                    returnValueInput("")
                    $("tbody").append(htmlNewArea)
                }else{
                    alertError(res.error)
                }
            });
        }
    })
    function editBTN(id, element){
        $.post(window.location.pathname.split("admin").join("find"), id, (res, stt, xhr)=>{
            if(typeof res==="object"){
                returnValueInput(res)
                $("#submit").text("Save").attr("id","save");
                $("form").append(`<input type='text' name="_id" style="display: none;" value="${res._id}"/>`);
                $("form").attr("action", window.location.pathname.split("admin").join("update"));
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
            }else{
                dropBTN({id : $(e.currentTarget).attr("class").split("btn ")[1]}, $(e.currentTarget))
            }
        }
    })
});