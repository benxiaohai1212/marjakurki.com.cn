/**
 * [single_gift_customize description]
 * @return {[type]} [description]
 */
function single_gift_customize() {
    // alert( $('#myModal #gift_name').val() );
    // alert( $('#myModal #gift_category').val() );

    var gift_name = $('#myModal #gift_name').val();
    var gift_category = $('#myModal #gift_category').val();
    var username = $('#myModal #username').val();
    var company = $('#myModal #conpanyname').val();
    var mobile = $('#myModal #phone').val();

    if (gift_name !== undefined &&  gift_category !== undefined && username !== undefined && company !== undefined && mobile !== undefined) { //Scenario !== undefined &&
//        $('.submit-con1').css('display', 'none');
//        $('.submit-con3').css('display', 'block');
        submit_single_gift(gift_name,gift_category,username,company,mobile);
        // alert("提交成功!")
        return;
    };
}

function submit_single_gift(gift_name,gift_category,username,company,mobile) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "single_gift_customize.php",
        data: JSON.stringify({ gift_name: gift_name, gift_category: gift_category, username: username, company: company, mobile: mobile }),
        success: function(resp) {
            console.log(resp);
            if(resp.result) {
                alert("您的定制信息已经成功提交！");
                $('#myModal').modal('hide');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(textStatus.error + " " + errorThrown);
            if(XMLHttpRequest.status == 403 && errorThrown == "Forbidden") {
                window.location.reload();
            } else {
                console.log(textStatus.error + "" + errorThrown);
            }
        },
        dataType : "json"
    });
}
