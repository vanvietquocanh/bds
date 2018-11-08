$(document).ready(function () {
    var convertLanguage = {
        "Diện tích" : "acreage",
        "Lô số"     : "landNumber",
        "Vị trí"    : "location",
        "Khu"       : "area",
        "Loại dự án": "typeProject",
        "Giá"       : "price",
        "Hướng"     : "direction",
        "Chi tiết"  : "details"
    }
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
    function createData(id) {
        return {
            "Diện tích" : $("#acreage").val(),
            "Lô số"     : $("#landNumber").val(),
            "Vị trí"    : $("#location").val(),
            "Khu"       : $("#area").val(),
            "Loại dự án": $("#typeProject").val(),
            "Giá"       : $("#price").val(),
            "Hướng"     : $("#direction").val(),
            "Chi tiết"  : $("#details").val(),
            "_id"       : (id)?id:""
        }
        
    }
    function successUpdate(data){
        let id = data._id;
        delete data._id;
        $.each(data, function(index, val) {
            if(index!=="Chi tiết"){
                $(`#${id}`).children(`.${convertLanguage[index]}`).text(val);
            }
        });
    }
    function successInsert(data) {
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
    }
    function submitForm(data, subParams, afterPost) {
        console.log(data);
        if(valid(data).length>0){
            alertError(valid(data))
        }else{
            $.each(data, function(index, val) {
                $(`[name='${index}']`).removeClass('null')
            });
            $.post(window.location.pathname.split("admin").join(subParams), data, function(res, textStatus, xhr) {
                if(res==="success"){
                    return afterPost;
                }else{
                    alertError(res.error)
                }
            });
        }
    }
    function initEventCreateArea() {
        returnValueInput("");
        $("#submit").click(e=>{
            let data = createData(false)
            delete data._id;
            submitForm(data, "new-area", successInsert(data))
        })
    }
    function editBTN(id, element){
        $.post(window.location.pathname.split("admin").join("find"), id, (res, stt, xhr)=>{
            if(typeof res==="object"){
                returnValueInput(res)
                $("#submit").unbind('click');
                $("#submit").text("Save").attr("id","btn-save");
                $("#form-add").append(`<button type="submit" id="destroy" class="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-5">Hủy</button>`)
                $("#destroy").click(function(event) {
                    initEventCreateArea();
                })
                $("#btn-save").click(function(event) {
                    $("#btn-save").unbind('click')
                    let data = createData(id.id)
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
    initEventCreateArea()
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