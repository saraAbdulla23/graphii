import './style.css'; // External CSS for styles
import { useRef, useEffect } from "react";
import React from "react";
import * as d3 from "d3"; // Ensure D3 is imported

export function XPprogression(props) {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      let containerWidth = chartRef.current.parentElement.clientWidth;

      const updateChart = () => {
        d3.select(chartRef.current).selectAll("*").remove();

        // Sort the timeline data
        const sortedTimeline = props.Data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Map data to chart data points
        const chartDataPoints = sortedTimeline.map((item) => ({
          x: new Date(item.createdAt),
          y: item.amount,
        }));

        // Adjusted chart dimensions for a much wider container
        const chartWidth = containerWidth * 1.1; // Further widen the chart
        const chartHeight = containerWidth * 0.55; // Adjust height for better clarity
        const margin = {
          top: containerWidth * 0.05,
          right: containerWidth * 0.2, // More space on the right for the Y-axis labels
          bottom: containerWidth * 0.12,
          left: containerWidth * 0.1,
        };

        // Calculate max X and Y values
        const maxX = Math.max(...chartDataPoints.map((point) => point.x));
        const maxY = Math.max(...chartDataPoints.map((point) => point.y));

        // Create SVG container
        const svg = d3
          .select(chartRef.current)
          .attr("width", chartWidth)
          .attr("height", chartHeight);

        // Create scales for X and Y axes
        const xScale = d3
          .scaleTime()
          .domain([new Date(sortedTimeline[0].createdAt), maxX])
          .range([margin.left, chartWidth - margin.right]);

        const yScale = d3
          .scaleLinear()
          .domain([0, maxY])
          .range([chartHeight - margin.bottom, margin.top]);

        // X and Y axis
        const xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)); // Show one tick per month
        const yAxis = d3.axisLeft(yScale).ticks(5);

        // Append X and Y axes to the SVG
        svg
          .append("g")
          .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
          .call(xAxis)
          .selectAll("text")
          .style("fill", "#4CAF50")
          .style("font-size", "12px")
          .attr("transform", "rotate(-45)") // Rotate labels for better spacing
          .style("text-anchor", "end"); // Align text to the end (diagonal)

        svg
          .append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(yAxis)
          .selectAll("text")
          .style("fill", "#4CAF50")
          .style("font-size", "12px");

        // Create line generator for the area chart
        const line = d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));

        // Gradient for smooth area under the line
        const gradient = svg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#4CAF50")
          .attr("stop-opacity", 0.8);
        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#4CAF50")
          .attr("stop-opacity", 0.8);

        // Append path for the area chart
        svg
          .append("path")
          .datum(chartDataPoints)
          .attr("fill", "url(#gradient)")
          .attr("d", d3.area().x((d) => xScale(d.x)).y0(yScale(0)).y1((d) => yScale(d.y)))
          .style("opacity", 0.6);

        // Append line for XP progression
        svg
          .append("path")
          .datum(chartDataPoints)
          .attr("fill", "none")
          .attr("stroke", "#388E3C") // dark green
          .attr("stroke-width", 2)
          .attr("d", line);

        // Add circles for data points
        const dataPoints = svg
          .selectAll("g")
          .data(chartDataPoints)
          .enter()
          .append("g")
          .attr("transform", (d) => `translate(${xScale(d.x)}, ${yScale(d.y)})`)
          .on("mouseover", function (event, d) {
            d3.select(this).select("circle").style("opacity", 1); // Show circle on hover
            d3.select(this)
              .append("text")
              .attr("x", -10)
              .attr("y", -10)
              .style("fill", "#4CAF50")
              .text(
                `(${d.x.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}, ${d.y})`
              )
              .attr("class", "tooltip-text");
          })
          .on("mouseout", function () {
            d3.select(this).select("circle").style("opacity", 0); // Hide circle
            d3.select(this).selectAll("text").remove(); // Remove text on hover out
          });

        dataPoints
          .append("circle")
          .attr("r", 6)
          .style("fill", "red")
          .style("opacity", 0)
          .style("transition", "opacity 0.3s");
      };

      updateChart(); // Initial chart rendering

      // Handle window resizing
      const handleResize = () => {
        containerWidth = chartRef.current.parentElement.clientWidth;
        updateChart();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [props.Data]);

  return (
    <div className="XPprogression-container graph">
      <h3 className="chart-title">XP Progression Over Time</h3>
      <svg className="chart-container" ref={chartRef}></svg>
    </div>
  );
}

