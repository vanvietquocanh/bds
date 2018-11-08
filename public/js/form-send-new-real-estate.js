$(document).ready(function () {
    $("form").attr("action", window.location.pathname.split("admin").join("new-area"));
    //set path form 
    function editBTN(id, element){
        $("#landNumber").val("");
        $("#location").val("");
        $("#area").val("");
        $("#typeProject").val("");
        $("#price").val("");
        $("#elm1").val("");
        $("#range_01").val("");
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
                editBTN($(e.currentTarget).attr("class").split("btn ")[1], $(e.currentTarget));
            }else{
                dropBTN({id : $(e.currentTarget).attr("class").split("btn ")[1]}, $(e.currentTarget))
            }
        }
    })
});