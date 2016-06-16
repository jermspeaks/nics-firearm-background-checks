const initialize = () => {
  // fetchStateData('Wyoming');
}

const changeEventHandler = event => {
  // console.log('You like ' + event.target.value + ' ice cream.');

  fetchStateData(event.target.value);
}

const fetchStateData = state => {
  let data;
  fetch(`/api/firearms?state=${state}`)
    .then(res => res.json())
    .then(response => {
      data = response.map(point => {
        return {
          month: point.month,
          handgun: point.handgun
        };
      });
      clearChart();
      generateGraph(data);
    })
    .catch(err => console.error(err));
}

const generateGraph = data => {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var formatDate = d3.time.format("%Y-%m");

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d.handgun); });

  var svg = d3.select("body").append('svg')
      .attr("id", "viz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(datum => {
    datum = type(datum);
  });

  x.domain(d3.extent(data, function(d) { return d.month; }));
  y.domain(d3.extent(data, function(d) { return d.handgun; }));

  svg.append("path")
    .attr("class", "line")
    .attr("d", line(data));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Handguns");

  function type(d) {
    d.month = formatDate.parse(d.month);
    d.handgun = +d.handgun;
    return d;
  }
}

const clearChart = () => {
  d3.select("#viz").remove();
}

// initialize();
