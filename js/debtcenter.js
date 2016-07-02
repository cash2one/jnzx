/**
 * Created by jack on 16/6/30.
 * China map visualization
 */
var city;
var timeIdx = 0;
var timeInter;

$(document).ready(function () {
    /*update nav bar*/
    updateNav();

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