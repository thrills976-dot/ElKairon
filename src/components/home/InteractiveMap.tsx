import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export function InteractiveMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;
    
    // Clear previous renders
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto");

    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    const g = svg.append("g");

    // Defs for gradients and markers
    const defs = svg.append("defs");

    // Glow filter
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Line gradient
    const gradient = defs.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#0d9488"); // Teal
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#eab308"); // Gold

    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then((world: any) => {
      const countries = topojson.feature(world, world.objects.countries) as any;

      // Draw map
      g.selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("d", path as any)
        .attr("fill", "#1e293b") // navy-800 equivalent
        .attr("stroke", "#334155") // slate-700
        .attr("stroke-width", 0.5)
        .attr("class", "country-path transition-colors duration-300");

      // Points of interest
      // Africa Hub (roughly Zimbabwe / South Africa area)
      const origin = [29.15, -19.01]; // Longitude, Latitude
      
      // Destinations
      const destinations = [
        { name: "UAE", coords: [54.2, 23.4], color: "#eab308" },
        { name: "Germany", coords: [10.4, 51.1], color: "#0d9488" },
        { name: "Ireland", coords: [-8.2, 53.3], color: "#0d9488" },
        { name: "Netherlands", coords: [5.2, 52.1], color: "#0d9488" }
      ];

      // Draw arcs
      destinations.forEach(dest => {
        const originProj = projection(origin as [number, number]);
        const destProj = projection(dest.coords as [number, number]);
        
        if (originProj && destProj) {
          // Calculate midpoint for curve
          const midX = (originProj[0] + destProj[0]) / 2;
          const midY = (originProj[1] + destProj[1]) / 2 - 50;

          const linePath = `M ${originProj[0]} ${originProj[1]} Q ${midX} ${midY} ${destProj[0]} ${destProj[1]}`;
          
          const pathElem = g.append("path")
            .attr("d", linePath)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 2)
            .style("stroke-dasharray", "5,5")
            .style("opacity", 0.6);

          // Animate the dash
          pathElem.append("animate")
            .attr("attributeName", "stroke-dashoffset")
            .attr("values", "100;0")
            .attr("duration", "3s")
            .attr("repeatCount", "indefinite");
        }
      });

      // Draw Origin marker
      const oProj = projection(origin as [number, number]);
      if (oProj) {
        g.append("circle")
          .attr("cx", oProj[0])
          .attr("cy", oProj[1])
          .attr("r", 6)
          .attr("fill", "#fff")
          .attr("stroke", "#eab308")
          .attr("stroke-width", 2)
          .style("filter", "url(#glow)");
          
        g.append("text")
          .attr("x", oProj[0] + 10)
          .attr("y", oProj[1] + 5)
          .text("African Talent Hub")
          .attr("fill", "#fff")
          .attr("font-size", "10px")
          .attr("font-weight", "bold");
      }

      // Draw Destination markers
      destinations.forEach(dest => {
        const dProj = projection(dest.coords as [number, number]);
        if (dProj) {
          g.append("circle")
            .attr("cx", dProj[0])
            .attr("cy", dProj[1])
            .attr("r", 4)
            .attr("fill", dest.color)
            .style("filter", "url(#glow)")
            .on("mouseenter", function(e) {
              d3.select(this).attr("r", 8).attr("fill", "#fff");
            })
            .on("mouseleave", function(e) {
              d3.select(this).attr("r", 4).attr("fill", dest.color);
            });
            
          g.append("text")
            .attr("x", dProj[0] + 8)
            .attr("y", dProj[1] - 5)
            .text(dest.name)
            .attr("fill", "#cbd5e1") // slate-300
            .attr("font-size", "9px")
            .style("opacity", 0.8);
        }
      });
      
      // Add zoom
      const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });
        
      svg.call(zoom as any);
      
    }).catch(err => console.error("Error loading map data: ", err));
  }, []);

  return (
    <div className="w-full bg-navy-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-navy-800 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2 flex items-center">
          Global Mobility Network
        </h4>
        <p className="text-navy-300 text-[10px] max-w-[200px]">
          Connecting African talent to premium opportunities in Europe and the UAE.
        </p>
      </div>
      <svg ref={svgRef} className="w-full h-full cursor-move" />
      <div className="absolute bottom-4 right-4 flex gap-4 text-[10px] uppercase font-bold tracking-widest">
        <span className="flex items-center gap-1 text-gold-500"><div className="w-2 h-2 rounded-full bg-gold-500"></div> Hub</span>
        <span className="flex items-center gap-1 text-teal-400"><div className="w-2 h-2 rounded-full bg-teal-400"></div> Destination</span>
      </div>
    </div>
  );
}
