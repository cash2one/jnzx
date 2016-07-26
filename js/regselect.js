
$(document).ready(function () {
    setHeight();
});

function setHeight(){
    var HEIG = $(window).height();
    var width = $(window).width();
    console.log(HEIG);
    console.log(width);

    var currentHeight = width*550/1440;
    console.log(currentHeight);

    if(currentHeight < HEIG){
        var margin = -(HEIG*1440/550 - width)/2;
        //$('#myCarousel img.img-responsive').css('width','100%');
        $('.selectrole img.img-responsive').css('height',HEIG);
        $('.selectrole img.img-responsive').css('width',HEIG*1440/550);
        $('.selectrole img.img-responsive').css('overflow','hidden');
        $('.selectrole img.img-responsive').css('margin-top',0);
        $('.selectrole img.img-responsive').css('margin-bottom',0);
        $('.selectrole img.img-responsive').css('margin-left',margin);
        $('.selectrole img.img-responsive').css('margin-right',margin);

        //max-width is 100% for img-responsive, so it is ok for height, not width
        $('.selectrole img.img-responsive').css('max-width',5000);
    }
}