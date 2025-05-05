"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface PopulationData {
  state: string;
  age: string;
  population: number;
}

export function VertBarChart() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      const res = await fetch("/data.json");
      const data: PopulationData[] = await res.json();

      const width = ref.current?.clientWidth ?? 928;
      const height = 500;
      const marginTop = 40;
      const marginRight = 30;
      const marginBottom = 40;
      const marginLeft = 50;
      const legendHeight = 40;

      const ageGroups = Array.from(new Set(data.map((d) => d.age))); // stack keys

      const reshaped = d3
        .groups(data, (d) => d.state)
        .map(([state, records]) => {
          const row: Record<string, number | string> = { state };
          for (const r of records) {
            row[r.age] = r.population;
          }
          return row;
        });

      const series = d3
        .stack<Record<string, number | string>>()
        .keys(ageGroups)(reshaped as Record<string, number>[]);

      const x = d3
        .scaleBand()
        .domain(
          d3.groupSort(
            data,
            (D) => -d3.sum(D, (d) => d.population),
            (d) => d.state
          )
        )
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(series, (s) => d3.max(s, (d) => d[1]))!])
        .nice()
        .range([height - marginBottom, marginTop + legendHeight]);

      const color = d3
        .scaleOrdinal<string>()
        .domain(series.map((d) => d.key!))
        .range(d3.schemeSpectral[series.length])
        .unknown("#ccc");

      const formatValue = (x: number) =>
        isNaN(x) ? "N/A" : x.toLocaleString("en");

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      // Legend
      const legendG = svg
        .append("g")
        .attr("transform", `translate(${marginLeft}, 10)`);

      const legendSpacing = 120;

      series.forEach((s, i) => {
        const legendRow = legendG
          .append("g")
          .attr("transform", `translate(${i * legendSpacing}, 0)`);

        legendRow
          .append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color(s.key!));

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("y", 12)
          .text(s.key!)
          .attr("font-size", "12px")
          .attr("fill", "#000");
      });

      // Draw bars
      svg
        .append("g")
        .selectAll("g")
        .data(series)
        .join("g")
        .attr("fill", (d) => color(d.key!))
        .selectAll("rect")
        .data((D) => D.map((d) => (Object.assign(d, { key: D.key }), d)))
        .join("rect")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("x", (d) => x((d.data as any).state)!)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .append("title")
        .text(
          (d) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            `${(d.data as any).state} ${(d as any).key}\n${formatValue(d[1] - d[0])}`
        );

      // X Axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      // Y Axis
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.selectAll(".domain").remove());

      if (ref.current) {
        ref.current.innerHTML = "";
        ref.current.appendChild(svg.node()!);
      }
    };

    renderChart();
  }, []);

  return <div ref={ref} style={{ width: "100%" }} />;
}
