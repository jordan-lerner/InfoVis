<!-- **********************-->
<!-- Scatterplot stuff below -->
<!-- **********************-->

<!-- CHANGE GP TO SALARY variable ( search and replace )-->
<!-- CHANGE Pos TO tradeplayer variable ( search and replace )-->

compareFilter  = "SAT"
function compareFilterUpdate(value){
  compareFilter = value;
}

var compareChart;
var tooltip2;
function scatterplotGraph2(passingName2){
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = (400 - margin.left - margin.right),
    height = (250 - margin.top - margin.bottom);

var TeamStats = passingName2;
/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d["GP"];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d[compareFilter];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.Pos;},
    color = d3.scale.category10();

d3.select("#area4").select("svg").remove();	
	
// add the graph canvas to the #area4 of the webpage
compareChart = d3.select("#area4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.select("#area6").select(".tooltip2").remove();
// add the tooltip2 area to the webpage
var tooltip2 = d3.select("#area6").append("div")
    .attr("class", "tooltip2")
    .style("opacity", 0);

// load data
d3.csv("data/teams/"+TeamStats+".csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d[compareFilter] = +d[compareFilter];
    d["GP"] = +d["GP"];
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([filter_scale[compareFilter]['min'],filter_scale[compareFilter]['max']]);

  // x-axis
  compareChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Salary");

  // y-axis
  compareChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value");

  // draw dots
  compareChart.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 8)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip2.transition()
               .duration(200)
               .style("opacity", 1);
          tooltip2.html(d["Player"] + "<br/> ("+compareFilter+": " + yValue(d) 
	        + ", GP: " + xValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip2.transition()
               .duration(500)
               .style("opacity", 0);
      });
	  document.getElementById("legend2").style.display = 'block';
/*
  // draw legend
  var legend = compareChart.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
	  */
});
}
