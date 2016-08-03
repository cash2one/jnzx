/**
 * Created by jack on 16/6/30.
 * China map visualization
 */
var city;
var timeIdx = 0;
var timeInter, timeInter1;

$(document).ready(function () {
    /*setHeight*/
    setHeight();

    /*update nav bar*/
    updateNav();

    //detect whether support svg or canvas
    if (!supportSVG()) {
        //replace the circle
        $('#drawing').html('<div><img class="img-responsive" src="images/circle.png" alt="统计信息"></div>');

        //replace the circle
        $('#china-map').html('<div style="margin-top: 20px"><img class="img-responsive" src="images/china.png" alt="中国地图"></div>');


        //update table
        d3.json("media/city.json", function (error, mcity) {
            city = mcity;
            timeInter1 = setInterval(refreshTableNoSVG, 3000);
        });


    } else {

        /*decide the window size*/
        var windowWid1 = $(window).width();
        if (windowWid1 > 500) {
            var wid1 = 520;
            var hei1 = 320;
        } else {
            var wid1 = windowWid1;
            var hei1 = wid1 * 7 / 13;
        }
        //three circle
        showCircle(wid1, hei1);

        d3.json("media/city.json", function (error, mcity) {
            city = mcity;

            /*decide the window size*/
            var windowWid = $(window).width();
            if (windowWid > 500) {
                var wid = 500;
                var hei = 400;
            } else {
                var wid = windowWid * 0.9;
                var hei = wid * 4 / 5;
            }

            showMapD3(wid, hei);  //when get city info, we plot China map
        });
    }

    //lawyer
    loadLawyer();

});

function loadLawyer(){
    //lawyer
    var jcarousel = $('.jcarousel');

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 1000) {
                width = width / 5;
            } else if (width >= 800) {
                width = width / 4;
            } else if(width >= 600){
                width = width / 3;
            } else if(width >= 350){
                width = width / 2;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular'
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .on('click', function(e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });
}

function supportSVG() {
    return document.createElement('svg').getAttributeNS
}

function supportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function setHeight() {
    var HEIG = 500;
    var width = $(window).width();
    if (width > 960) {
        var margin = -(width * 550 / 1440 - HEIG) / 2;
        var height = width * 550 / 1440;

        $('#myCarousel img.img-responsive').css('width', '100%');
        $('#myCarousel img.img-responsive').css('overflow', 'hidden');
        $('#myCarousel img.img-responsive').css('height', height);
        $('#myCarousel img.img-responsive').css('margin-top', margin);
        $('#myCarousel img.img-responsive').css('margin-bottom', margin);
        $('#myCarousel img.img-responsive').css('margin-left', 0);
        $('#myCarousel img.img-responsive').css('margin-right', 0);

    }
}

function showCircle(width, height) {

    var draw = SVG('drawing').size(width, height);
    var svg = $('#drawing').find('svg')[0];
    svg.setAttribute('viewBox', '0 0 ' + 520 + ' ' + 320);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');


    var circle1 = draw.circle(150).attr({
        cx: 103
        , cy: 137
        , fill: '#292a34'
        , 'fill-opacity': 0.8
    })
    var circle2 = draw.circle(150).attr({
        cx: 230
        , cy: 200
        , fill: '#1fda46'
        , 'fill-opacity': 0.8
    })
    var circle3 = draw.circle(150).attr({
        cx: 340
        , cy: 110
        , fill: '#00cccd'
        , 'fill-opacity': 0.8
    })
    var text1 = draw.text("案件数量").attr({
        x: 103
        , y: 142
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 15
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var text2 = draw.text("债务总额").attr({
        x: 230
        , y: 202
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 15
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var text3 = draw.text("催收率").attr({
        x: 340
        , y: 114
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 15
        , anchor: 'middle'
        , leading: '1.5em'
    })

    var num1 = draw.text("28").attr({
        x: 100
        , y: 87
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , style: 'italic'
        , size: 32
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var num2 = draw.text("0.40亿").attr({
        x: 228
        , y: 150
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , style: 'italic'
        , size: 32
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var num3 = draw.text("90.00%").attr({
        x: 338
        , y: 60
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , style: 'italic'
        , size: 32
        , anchor: 'middle'
        , leading: '1.5em'
    })

    var sh1;
    var time1 = 40;
    var ni1 = new SVG.Number('28')

    var sh2;
    var time2 = 40;
    var ni2 = 0.40;

    var sh3;
    var time3 = 20;
    var sh4;
    var time4 = 20;
    //var ni3 = new SVG.Number('98.00%')
    var ni3 = 90.00;

    function delay3() {
        sh3 = setInterval("rise3()", 30);
    }

    var flag = 0;
    $(window).scroll(function () {
        var x = $(document).scrollTop()
        if ($(document).scrollTop() > 100 && flag == 0) {
            circle1.animate(1500, '>', 100).attr({r: '80'})
            circle2.animate(1500, '>', 100).attr({r: '80'})
            circle3.animate(1500, '>', 100).attr({r: '80'})
            sh1 = setInterval(function () {
                ni1 = ni1.plus('2');
                num1.text(ni1.toString());
                time1 = time1 - 1;
                if (time1 <= 0) {
                    clearInterval(sh1);
                }
            }, 30);
            sh2 = setInterval(function () {
                ni2 = parseFloat(ni2) + 0.04;
                ni2 = parseFloat(ni2).toFixed(2);
                num2.text(ni2.toString() + "亿");
                time2 = time2 - 1;
                if (time2 <= 0) {
                    clearInterval(sh2);
                }
            }, 30);
            sh3 = setInterval(function () {
                ni3 = ni3 - 0.03;
                ni3 = ni3.toFixed(2);
                num3.text(ni3.toString() + '%');
                time3 = time3 - 1;
                if (time3 <= 0) {
                    clearInterval(sh3);
                    sh4 = setInterval(function () {
                        ni3 = parseFloat(ni3) + 0.03;
                        ni3 = ni3.toFixed(2);
                        num3.text(ni3.toString() + '%');
                        time4 = time4 - 1;
                        if (time4 <= 0) {
                            clearInterval(sh4);
                        }
                    }, 30);
                }
            }, 30);

            flag = 1
        }
        ;
    });
}

//update nav bar based on current url address
function updateNav() {
    var position = window.location.pathname;
    var slash1 = position.lastIndexOf('/');
    var posName = position.substring(slash1 + 1, position.length);
    $('#' + posName).addClass('active');
}

//option1: visualize China map with D3.js
function showMapD3(width, height) {
    //var width = 500, height = 400;

    var svg = d3.select("#china-map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "map-svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + height);

    var proj = d3.geo.mercator().center([105, 38]).scale(width * 0.8).translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(proj);

    d3.xml("media/southchinasea.svg", function (error, xmlDocument) {
        svg.html(function (d) {
            return xmlDocument.getElementsByTagName("g")[0].outerHTML + d3.select(this).html();
        });

        var gSouthSea = d3.select("#southsea");

        gSouthSea.attr("transform", "translate(380,300)scale(0.5)")
            .attr("class", "southsea");

    });

    d3.json("media/china1.json", function (error, cn) {
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(cn.features)
            .enter()
            .append("path")
            .attr("stroke", "#5dd5d6")
            .attr("stroke-width", 1)
            .attr("fill", "#cbe3e3")   //color in the original map
            .attr("d", path)

        //add point
        svg.selectAll("circle")
            .data(city).enter()
            .append("circle")
            .attr("cx", function (d) {
                var cit_oripos = [parseFloat(d['x']), parseFloat(d['y'])];
                return proj(cit_oripos)[0];
            })
            .attr("cy", function (d) {
                var cit_oripos = [parseFloat(d['x']), parseFloat(d['y'])];
                return proj(cit_oripos)[1];
            })
            .attr("r", "4px")
            .attr("fill", "white")
            .on("mouseover", function (d) {
                clearInterval(timeInter);

                //1.change point size and color
                svg.selectAll("circle").each(function (d, i) {
                    d3.select(this).transition().duration(1000).ease("elastic").style({'fill': "white", "r": "4px"});
                });
                d3.select(this).transition().duration(1000).ease("elastic")
                    .style({'fill': "#3fe265", "r": "10px"});

                //2.change table content
                refreshTable(d, 400);
            })
            .on("mouseout", function (d) {
                //1.change point size and color
                d3.select(this).transition().duration(1000)
                    .style({'fill': "white", "r": "4px"});

                //set timer
                timeInter = setInterval(showMapNode, 3000);
            });

        //initialize the first node
        svg.selectAll("circle").each(function (d, i) {
            if (d['id'] == "12999001") {
                d3.select(this).style({'fill': "#3fe265", "r": "10px"});
            }
        });

        //set timer
        timeInter = setInterval(showMapNode, 3000);
    });
}

function showMapNode() {
    var cityLen = city.length;
    if (cityLen > 0) {
        d3.select("#map-svg").selectAll("circle").each(function (d, i) {
            if (i == timeIdx) {
                d3.select(this).transition().duration(1000).style({'fill': "white", "r": "4px"});
            }
        });
        timeIdx = (timeIdx + 1) % cityLen;
        d3.select("#map-svg").selectAll("circle").each(function (d, i) {
            if (i == timeIdx) {
                d3.select(this).transition().duration(1000).style({'fill': "#3fe265", "r": "10px"});
                refreshTable(d, 1000);
            }
        });
    }
}

//change table content
function refreshTable(data, freq) {
    $("#idx_head").animate({"opacity": 0}, freq, function () {
        $("#idx_head").html(data["city"] + " " + data["client"] + " 催收编号：" + data["id"]);
        $("#idx_head").animate({"opacity": 1}, freq);
    });

    $("#idx_money").animate({"opacity": 0}, freq, function () {
        $("#idx_money").html(data["money"]);
        $("#idx_money").animate({"opacity": 1}, freq);
    });

    $("#idx_return").animate({"opacity": 0}, freq, function () {
        $("#idx_return").html(data["return"]);
        $("#idx_return").animate({"opacity": 1}, freq);
    });

    $("#idx_due").animate({"opacity": 0}, freq, function () {
        $("#idx_due").html(data["due"]);
        $("#idx_due").animate({"opacity": 1}, freq);
    });

    $("#idx_lawyer").animate({"opacity": 0}, freq, function () {
        $("#idx_lawyer").html(data["lawyer"]);
        $("#idx_lawyer").animate({"opacity": 1}, freq);
    });

    $("#idx_moneyGet").animate({"opacity": 0}, freq, function () {
        $("#idx_moneyGet").html(data["moneyGet"]);
        $("#idx_moneyGet").animate({"opacity": 1}, freq);
    });
}

function refreshTableNoSVG() {
    var freq = 1000;
    var cityLen = city.length;
    var data = city[timeIdx];

    $("#idx_head").animate({"opacity": 0}, freq, function () {
        $("#idx_head").html(data["city"] + " " + data["client"] + " 催收编号：" + data["id"]);
        $("#idx_head").animate({"opacity": 1}, freq);
    });

    $("#idx_money").animate({"opacity": 0}, freq, function () {
        $("#idx_money").html(data["money"]);
        $("#idx_money").animate({"opacity": 1}, freq);
    });

    $("#idx_return").animate({"opacity": 0}, freq, function () {
        $("#idx_return").html(data["return"]);
        $("#idx_return").animate({"opacity": 1}, freq);
    });

    $("#idx_due").animate({"opacity": 0}, freq, function () {
        $("#idx_due").html(data["due"]);
        $("#idx_due").animate({"opacity": 1}, freq);
    });

    $("#idx_lawyer").animate({"opacity": 0}, freq, function () {
        $("#idx_lawyer").html(data["lawyer"]);
        $("#idx_lawyer").animate({"opacity": 1}, freq);
    });

    $("#idx_moneyGet").animate({"opacity": 0}, freq, function () {
        $("#idx_moneyGet").html(data["moneyGet"]);
        $("#idx_moneyGet").animate({"opacity": 1}, freq);
    });

    timeIdx = (timeIdx + 1) % cityLen;
}