/**
 * Created by jack on 16/6/30.
 * nav update
 */

$(document).ready(function () {
    /*update nav bar*/
    updateNav();
    updateAccordion();

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

//update accordion color
function updateAccordion(){
    $("#twoHead").addClass('greyHead');
    $("#threeHead").addClass('greyHead');

    $('#collapseOne').on('show.bs.collapse', function () {
        $("#oneHead").removeClass('greyHead');
    })

    $('#collapseOne').on('hidden.bs.collapse', function () {
        $("#oneHead").addClass('greyHead');
        $("#oneHead").addClass('greyHead');
    })

    $('#collapseTwo').on('show.bs.collapse', function () {
        $("#twoHead").removeClass('greyHead');
    })

    $('#collapseTwo').on('hidden.bs.collapse', function () {
        $("#twoHead").addClass('greyHead');
    })

    $('#collapseThree').on('show.bs.collapse', function () {
        $("#threeHead").removeClass('greyHead');
    })

    $('#collapseThree').on('hidden.bs.collapse', function () {
        $("#threeHead").addClass('greyHead');
    })
}