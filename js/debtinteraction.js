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

    var stage = parseInt($("#stage").text());
    console.log(stage);
    if(stage <= 5){  //first
        $("#collapseOne").collapse('show');
        // $("#twoHead").addClass('greyHead');
        // $("#threeHead").addClass('greyHead');

        $("#twoHead i").removeClass('icon-caret-down');
        $("#twoHead i").addClass('icon-caret-up');
        $("#threeHead i").removeClass('icon-caret-down');
        $("#threeHead i").addClass('icon-caret-up');


    }else if(stage > 5 && stage <=10){  //second
        $("#collapseTwo").collapse('show');
        // $("#oneHead").addClass('greyHead');
        // $("#threeHead").addClass('greyHead');
        $("#oneHead i").removeClass('icon-caret-down');
        $("#oneHead i").addClass('icon-caret-up');
        $("#threeHead i").removeClass('icon-caret-down');
        $("#threeHead i").addClass('icon-caret-up');

    }else{  //final
        $("#collapseThree").collapse('show');
        // $("#oneHead").addClass('greyHead');
        // $("#twoHead").addClass('greyHead');
        $("#oneHead i").removeClass('icon-caret-down');
        $("#oneHead i").addClass('icon-caret-up');
        $("#twoHead i").removeClass('icon-caret-down');
        $("#twoHead i").addClass('icon-caret-up');

    }

    $('#collapseOne').on('show.bs.collapse', function () {
        $("#oneHead i").removeClass('icon-caret-up');
        $("#oneHead i").addClass('icon-caret-down');
    })

    $('#collapseOne').on('hidden.bs.collapse', function () {
        $("#oneHead i").removeClass('icon-caret-down');
        $("#oneHead i").addClass('icon-caret-up');
    })

    $('#collapseTwo').on('show.bs.collapse', function () {
        $("#twoHead i").removeClass('icon-caret-up');
        $("#twoHead i").addClass('icon-caret-down');
    })

    $('#collapseTwo').on('hidden.bs.collapse', function () {
        $("#twoHead i").removeClass('icon-caret-down');
        $("#twoHead i").addClass('icon-caret-up');
    })

    $('#collapseThree').on('show.bs.collapse', function () {
        $("#threeHead i").removeClass('icon-caret-up');
        $("#threeHead i").addClass('icon-caret-down');
    })

    $('#collapseThree').on('hidden.bs.collapse', function () {
        $("#threeHead i").removeClass('icon-caret-down');
        $("#threeHead i").addClass('icon-caret-up');
    })
}