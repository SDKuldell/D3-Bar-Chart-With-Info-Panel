d3.csv("cities.csv", d3.autoType).then((data) => {
  console.log("cities", data);
  euData = data.filter((element) => {
    return element.eu;
  });
  console.log("EU Cities: ", euData);
  d3.select(".city-count").text("Number of Cities: " + euData.length);

  const width = 700;
  const height = 550;
  const svg = d3
    .select(".population-plot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("circle")
    .data(euData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", function (d) {
      return d.population < 1000000 ? 4 : 8;
    });

  svg
    .selectAll("text")
    .data(euData)
    .enter()
    .append("text")
    .filter((d) => {
      return d.population > 1000000;
    })
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y - 10;
    })
    .attr("font-size", "11px")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.country;
    });
});

d3.csv("buildings.csv", d3.autoType).then((data) => {
  data = data.sort(function (a, b) {
    return a.height_ft > b.height_ft ? -1 : a.height_ft > b.height_ft ? 1 : 0;
  });

  console.log(data);

  const width = 500;
  const height = 500;
  const bars = d3
    .select(".building-bar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  bars
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 200)
    .attr("y", function (d, i) {
      return i * 32;
    })
    .attr("width", function (d) {
      return d.height_px;
    })
    .attr("height", 30)
    .attr("fill", "maroon");

  var texts = bars.selectAll("text").data(data).enter();
  texts
    .append("text")
    .attr("x", 0)
    .attr("y", function (d, i) {
      return i * 32 + 20;
    })
    .attr("font-size", "13px")
    .attr("fill", "gray")
    .attr("text-anchor", "start")
    .text(function (d) {
      return d.building;
    });

  texts
    .append("text")
    .attr("x", function (d, i) {
      return d.height_px + 190;
    })
    .attr("y", function (d, i) {
      return i * 32 + 20;
    })
    .attr("font-size", "14px")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .text(function (d) {
      return d.height_ft + " ft";
    });

  var imgs = d3
    .select(".building-photo")
    .append("image")
    .attr("src", "./assets/1.jpg");

  bars
    .selectAll("rect")
    .on("click", function (callback, d) {
      d3.select(".building-photo").attr("src", "./assets/" + d.image);
      console.log("./assets/" + d.image);
      d3.select(".building-name").text(d.building);
      d3.select(".height").text(d.height_ft);
      d3.select(".country").text(d.country);
      d3.select(".city").text(d.city);
      d3.select(".floors").text(d.floors);
      d3.select(".completed").text(d.completed);
    })
    .on("mouseover", function (d, i) {
      d3.select(this).attr("fill", "red");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("fill", "maroon");
    });
});
