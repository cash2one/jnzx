/**
 * Created by jack on 16/6/30.
 * js control logic
 */
$(document).ready(function () {
    /*update nav bar*/
    updateNav();

    //display div based on user selection
    $("#collectType").change(function(){
        var collectType = $("#collectType").val();
        console.log(collectType);
        if(collectType == "corp"){
            $("#corpDiv").show();
            $("#lawyerDiv").hide();
        }else{
            $("#corpDiv").hide();
            $("#lawyerDiv").show();
        }
    });

    /*file upload*/
    $("#proof").fileinput({
        showUpload: false,
        removeClass: "btn btn-default file-btn",
        language: "zh",
        initialCaption:"输入文件"
    });

    // previewFileType: "text",
    //     allowedFileExtensions: ["txt", "md", "ini", "text"],

});

//update nav bar based on current url address
function updateNav() {
    var position = window.location.pathname;
    var dot1 = position.indexOf('.')
    if (dot1 < 0) {  //home
        $('#index').addClass('active');
    } else {
        //index.html or other
        var slash1 = position.lastIndexOf('/');
        if (slash1 < 0) {  // impossible
            $('#index').addClass('active');
        } else {
            var posName = position.substring(slash1 + 1, dot1);
            $('#' + posName).addClass('active');
        }
    }
}