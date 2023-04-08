import React, { Component } from "react";
import * as d3 from "d3";

class Graph extends Component {
   componentDidMount() {
      this.drawChart();
   }

   drawChart() {
      const data = this.props.data;
      const svg = d3.select("svg");
      const width = svg.attr("width");
      const height = svg.attr("height");

      // create x-axis
      const x = d3
         .scaleTime()
         .range([0, width])
         .domain(d3.extent(data, (d) => new Date(d.date)));

      svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

      // create y-axis
      const y = d3
         .scaleLinear()
         .range([height, 0])
         .domain([0, d3.max(data, (d) => d.price)]);

      svg.append("g").call(d3.axisLeft(y));

      // create line
      const line = d3
         .line()
         .x((d) => x(new Date(d.date)))
         .y((d) => y(d.price));

      svg.append("path")
         .datum(data)
         .attr("fill", "none")
         .attr("stroke", "steelblue")
         .attr("stroke-width", 1.5)
         .attr("d", line);
   }

   render() {
      return <svg width="400" height="400"></svg>;
   }
}

export default Graph;
