/**
 * Created by jack on 16/6/30.
 * China map visualization
 */

$(document).ready(function () {
    showMapD3();

});

//option1: visualize China map with D3.js
function showMapD3() {
    var width = 960, height = 800;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + height);

    var tooltip = d3.select("#china-map");

    var proj = d3.geo.mercator().center([105, 38]).scale(750).translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(proj);

    d3.json("media/cn.json", function (error, cn) {
        console.log(cn);
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(cn.features)
            .enter()
            .append("path")
            .on("mouseover", function (d) {
                tooltip.style("display", null);
                // name @ d.properties.name
                showText(d.id)
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            .attr("d", path)
    });

    //处理要显示的文字
    function showText(_id) {

        tooltip.text(_id)
    }

}

//option2: visualize China map with echarts

function showMapEcharts(){

}