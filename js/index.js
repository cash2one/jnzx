/**
 * Created by jack on 16/6/30.
 * China map visualization
 */
var city;

$(document).ready(function () {
    d3.json("media/city.json", function (error, mcity){
        city = mcity;
        showMapD3();  //when get city info, we plot China map
    });

});

//option1: visualize China map with D3.js
function showMapD3() {
    var width = 500, height = 400;

    var svg = d3.select("#china-map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + height);

    var tooltip = d3.select("#map-info");

    var proj = d3.geo.mercator().center([105, 38]).scale(400).translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(proj);

    d3.json("media/china.json", function (error, cn) {
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(cn.features)
            .enter()
            .append("path")
            .attr("stroke","#5dd5d6")
            .attr("stroke-width",1)
            .attr("fill","#cbe3e3")   //color in the original map
            .attr("d", path)

        //add point
        svg.selectAll("circle")
            .data(city).enter()
            .append("circle")
            .attr("cx", function (d) {
                var cit_oripos = [parseFloat(d['x']),parseFloat(d['y'])];
                return proj(cit_oripos)[0];
            })
            .attr("cy", function (d) {
                var cit_oripos = [parseFloat(d['x']),parseFloat(d['y'])];
                return proj(cit_oripos)[1];
            })
            .attr("r", "4px")
            .attr("fill", "white")
            .on("mouseover", function (d) {
                //1.change point size and color
                d3.selectAll("circle").each(function (d, i) {
                    d3.select(this).transition().duration(1000).ease("elastic").style({'fill': "white","r":"4px"});
                });
                d3.select(this).transition().duration(1000).ease("elastic")
                    .style({'fill': "#3fe265","r":"10px"});

                //2.change table content
                refreshTable(d);
            })
            .on("mouseout", function (d) {
                //1.change point size and color
                // d3.select(this).transition().duration(800)
                //     .style({'fill': "white", "r": "4px"});
            });

        //initialize the first node
        d3.selectAll("circle").each(function (d, i) {
            if (d['id']=="12999001") {
                d3.select(this).style({'fill': "#3fe265","r":"10px"});
            }
        });

    });

}

//change table content
function refreshTable(data){

    var htmlContent = '<table class="table"><thead><tr><th>'+data["city"]+' '+data["client"]+' '+'催收编号：'+data["id"]+'</th></tr></thead><tbody>';
    htmlContent += '<tr class="items-odd"><td>债权金额(万元)</td><td>'+data['money']
    +'</td></tr><tr class="items-even"><td>回报</td><td>' +data['return']
    +'</td></tr><tr class="items-odd"><td>逾期时间</td><td>'+data['due']
    +'</td></tr><tr class="items-even"><td>代办律师</td><td>'+data['lawyer']
    +'</td></tr><tr class="items-final"><td>追回总额(万元)</td><td>'+data['moneyGet']
    +'</td></tr></tbody></table>';

    $("#map-info").html(htmlContent);

}

//option2: visualize China map with echarts
function showMapEcharts(){

}