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

    //three circle
    showCircle();

    d3.json("media/city.json", function (error, mcity) {
        city = mcity;
        showMapD3();  //when get city info, we plot China map
    });


});

function showCircle() {
    var draw = SVG('drawing').size(520, 320)
    var circle1 = draw.circle(150).attr({
        cx: 103
        , cy: 137
        , fill: '#54555d'
        , 'fill-opacity': 0.8
    })
    var circle2 = draw.circle(130).attr({
        cx: 261
        , cy: 216
        , fill: '#4ce16b'
        , 'fill-opacity': 0.8
    })
    var circle3 = draw.circle(100).attr({
        cx: 403
        , cy: 110
        , fill: '#33d6d7'
        , 'fill-opacity': 0.8
    })
    var text1 = draw.text("案件数量").attr({
        x: 103
        , y: 142
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 18
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var text2 = draw.text("债务总额").attr({
        x: 261
        , y: 221
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 18
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var text3 = draw.text("催收率").attr({
        x: 403
        , y: 115
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 18
        , anchor: 'middle'
        , leading: '1.5em'
    })

    var num1 = draw.text("1088").attr({
        x: 103
        , y: 77
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 38
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var num2 = draw.text("18亿").attr({
        x: 261
        , y: 156
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 38
        , anchor: 'middle'
        , leading: '1.5em'
    })
    var num3 = draw.text("48%").attr({
        x: 403
        , y: 60
        , fill: '#eee'
    }).font({
        family: 'Microsoft YaHei'
        , size: 38
        , anchor: 'middle'
        , leading: '1.5em'
    })

    var sh1;
    var time1 = 50;
    var ni1 = new SVG.Number('1088')

    var sh2;
    var time2 = 50;
    var ni2 = new SVG.Number('18')

    var sh3;
    var time3 = 50;
    var ni3 = new SVG.Number('48%')

    function delay3() {
        sh3 = setInterval("rise3()", 30);
    }

    var flag = 0
    $(window).scroll(function () {
        var x = $(document).scrollTop()
        if ($(document).scrollTop() > 300 && flag == 0) {
            circle1.animate(1500, '>', 100).attr({r: '100'})
            circle2.animate(1500, '>', 100).attr({r: '100'})
            circle3.animate(1500, '>', 100).attr({r: '100'})
            sh1 = setInterval(function () {
                ni1 = ni1.plus('3356');
                num1.text(ni1.toString());
                time1 = time1 - 1;
                if (time1 <= 0) {
                    clearInterval(sh1);
                }
                ;
            }, 30);
            sh2 = setInterval(function () {
                ni2 = ni2.plus('3');
                num2.text(ni2.toString() + "亿");
                time2 = time2 - 1;
                if (time2 <= 0) {
                    clearInterval(sh2);
                }
                ;
            }, 30);
            sh3 = setInterval(function () {
                ni3 = ni3.plus('1%');
                num3.text(ni3.toString());
                time3 = time3 - 1;
                if (time3 <= 0) {
                    clearInterval(sh3);
                }
                ;
            }, 30);
            flag = 1
        }
        ;
    });
}

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

//option1: visualize China map with D3.js
function showMapD3() {
    var width = 500, height = 400;

    var svg = d3.select("#china-map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "map-svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + height);

    var proj = d3.geo.mercator().center([105, 38]).scale(400).translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(proj);

    d3.json("media/china.json", function (error, cn) {
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
                refreshTable(d);
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
                refreshTable(d);
            }
        });
    }
}


//change table content
function refreshTable_ori(data) {
    var htmlContent = '<table class="table"><thead><tr><th>' + data["city"] + ' ' + data["client"] + ' ' + '催收编号：' + data["id"] + '</th></tr></thead><tbody>';
    htmlContent += '<tr class="items-odd"><td>债权金额 (万元)</td><td>' + data['money']
        + '</td></tr><tr class="items-even"><td>回报</td><td>' + data['return']
        + '</td></tr><tr class="items-odd"><td>逾期时间</td><td>' + data['due']
        + '</td></tr><tr class="items-even"><td>代办律师</td><td>' + data['lawyer']
        + '</td></tr><tr class="items-final"><td>追回总额 (万元)</td><td>' + data['moneyGet']
        + '</td></tr></tbody></table>';

    $("#map-info").html(htmlContent);
}


//change table content
function refreshTable1(data) {
    //$("#map-info").css('display','none');
    $("#map-info").hide();
    var htmlContent = '<table class="table"><thead><tr><th>' + data["city"] + ' ' + data["client"] + ' ' + '催收编号：' + data["id"] + '</th></tr></thead><tbody>';
    htmlContent += '<tr class="items-odd"><td>债权金额 (万元)</td><td>' + data['money']
        + '</td></tr><tr class="items-even"><td>回报</td><td>' + data['return']
        + '</td></tr><tr class="items-odd"><td>逾期时间</td><td>' + data['due']
        + '</td></tr><tr class="items-even"><td>代办律师</td><td>' + data['lawyer']
        + '</td></tr><tr class="items-final"><td>追回总额 (万元)</td><td>' + data['moneyGet']
        + '</td></tr></tbody></table>';

    $("#map-info").html(htmlContent);
    $("#map-info").show('slow');
}

//change table content
function refreshTable(data) {
    $("#idx_head").hide().html(data["city"]+" "+data["client"]+" 催收编号："+data["id"]).fadeIn(1000);
    $("#idx_money").hide().html(data["money"]).fadeIn(1000);
    $("#idx_return").hide().html(data["return"]).fadeIn(1000);
    $("#idx_due").hide().html(data["due"]).fadeIn(1000);
    $("#idx_lawyer").hide().html(data["lawyer"]).fadeIn(1000);
    $("#idx_moneyGet").hide().html(data["moneyGet"]).fadeIn(1000);
}