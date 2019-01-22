$(document).ready(function () {
    var convertLanguage = {
        "Diện tích" : "acreage",
        "Lô số"     : "landNumber",
        "Vị trí"    : "location",
        "Khu"       : "area",
        "Loại dự án": "typeProject",
        "Giá"       : "price",
        "Hướng"     : "direction",
        "Sổ đỏ"     : "landCertificates",
        "Sổ hồng"   : "certificateOfHousing",
        "Môi trường": "enviroment",
        "Phòng tắm" : "bathroom",
        "Chi tiết"  : "details",
        "Phòng ngủ" : "bedroom",
        "Nhà để xe" : "gara",
        "Giường"    : "bed",
        "An ninh"   : "security",
        "Giao thông": "traffic",
        "Giáo dục"  : "education",
        "Y tế"      : "medical",
        "Loại BDS"  : "typeRealEstate",
        "Cửa hàng"  : "store",
        "Trường học": "schools",
        "Sân bay"   : "airport",
      "Trung tâm TP": "cityCenter",
      "Ảnh chi tiết": "image",
      "Tiêu đề ảnh" : "title-image",
        "Bệnh viện" : "hospital"
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
        if(typeof data==="string"){
            $.each(convertLanguage, function(index, val) {
                if(val==="landCertificates"||val==="certificateOfHousing"){
                    $(`#${val}`).prop("checked", false)
                }else if(val==="direction"){
                    $(`#${val}1`).val(data)
                    $(`#${val}2`).val(data)
                }else{
                    $(`#${val}`).val(data)
                }
            });
        }else{
            $.each(data, function(index, el) {
                if(index==="_id"){
                }else if(index==="Sổ đỏ"||index==="Sổ hồng"){
                    $(`#${convertLanguage[index]}`).prop("checked", (data[index]==="true")?true:false)
                }else if(index==="Hướng"){
                    $(`#${convertLanguage[index]}1`).val(el[0])
                    $(`#${convertLanguage[index]}2`).val(el[1])
                }else{
                    $(`#${convertLanguage[index]}`).val(data[index])
                }
            });
        }
    }
    function createData(id) {
        var data = new Object();
        $.each(convertLanguage, function(index, val) {
            console.log(val)
            if(val==="landCertificates"||val==="certificateOfHousing"){
                data[index] = $(`#${val}`).is(":checked")
            }else if(val==="direction"){
                data[index] = [$(`#${val}1`).val(),$(`#${val}2`).val()]
            }else{
                data[index] = $(`#${val}`).val()
            }
        });
        data._id = (id)?id:"";
        return data;
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
                                <td>${(data["Sổ đỏ"])?"có":"không"}</td>
                                <td>
                                    <button disabled type="button" class="btn-primary btn">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button disabled type="button" class="btn-danger btn">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>`
        returnValueInput("")
        $("tbody").append(htmlNewArea)
    }
    function submitForm(data, subParams, afterPost) {
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
            console.log(data);
            submitForm(data, "new-area", successInsert(data))
        })
    }
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
    // $.get('/huonggiachu',function(data, textStatus, xhr) {
    //     console.log(data);
    // });
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
    var numberImage = 1;
    function create(arguments) {
        
    }
    $(`.title-image-${numberImage}`).keyup(function(event) {
        if($(`#image-${numberImage}`).prop('files').length){
            $(`.title-image-${numberImage}`).unbind('keyup')
            numberImage=numberImage+1;
            $(".form-group.row").append(`<div class="col-xs-2">
                                            <input type="file" name="image-${numberImage}" id="image-${numberImage}" class="form-control m-b-5 col-xs-3 image">
                                        </div>
                                        <div class="col-xs-2">
                                            <input type="text" placeholder="title-${numberImage}" name="title-${numberImage}" id="title-image-${numberImage}" class="form-control m-b-5 col-xs-3 title-image-${numberImage}">
                                        </div>`);
        }
    });
});