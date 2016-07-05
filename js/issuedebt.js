/**
 * Created by jack on 16/6/30.
 */

$(document).ready(function () {
    /*update nav bar*/
    updateNav();
    
    /*file upload*/
    $("#proof").fileinput({
        showUpload: false,
        removeClass: "btn btn-default file-btn",
        language: "zh"
    });

    // previewFileType: "text",
    //     allowedFileExtensions: ["txt", "md", "ini", "text"],

    /*time picker: http://www.bootcss.com/p/bootstrap-datetimepicker/demo.htm */
    $(".form_datetime").datetimepicker({
        format: "dd MM yyyy - hh:ii"
    });


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