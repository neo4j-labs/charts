export default function () {}

// function linkArc(d) {
//     const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
//     return `
//       M${d.source.x},${d.source.y}
//       A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
//     `;
//   }

// const drag = (simulation) => {
//     const dragstarted = (d) => {
//         if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//     };

//     const dragged = (d) => {
//         d.fx = d3.event.x;
//         d.fy = d3.event.y;
//     };

//     const dragended = (d) => {
//         if (!d3.event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//     };

//     return d3
//         .drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended);
// };

// const forcedGraph = function (svgElement, graph, onNodeClick) {

//     if (!svgElement) return

//     const containerRect = svgElement.getBoundingClientRect();
//     const height = containerRect.height;
//     const width = containerRect.width;


//     const simulation = d3
//         .forceSimulation(graph.nodes)
//         .force("link", d3.forceLink(graph.links).id(d => (d as Record<string, any>).id))
//         .force("charge", d3.forceManyBody().strength(-10000).distanceMin(100))
//         .force("x", d3.forceX())
//         .force("y", d3.forceY());


//     const svg = d3
//         .select(svgElement)
//         .append("svg")
//         // @ts-ignore
//         .attr("viewBox", [-width / 2, -height / 2, width, height])
//         // @ts-ignore
//         .call(d3.zoom().on("zoom", function () {
//             svg.attr("transform", d3.event.transform);
//         }));


//     const link = svg
//         .append("g")
//         // .attr("stroke", "#000")
//         // .attr("stroke-opacity", 0.6)
//         .selectAll("path")
//         .data(graph.links)
//         .join("line")
//         .attr("stroke-width", 3);

//     const node = svg
//         .append("g")
//         // .attr("fill", "#fff")
//         // .attr("stroke", "#000")
//         .attr("stroke-width", 5)
//         .attr("class", "text-gray-600 stroke-current")
//         .selectAll("circle")
//         .data(graph.nodes)
//         .join("circle")
//         .attr("r", 50)
//         .attr("fill", "white")
//         .attr("class", "stroke-current")
//         .on("click", d => onNodeClick(d.id))
//         // @ts-ignore
//         .call(drag(simulation));

//     // @ts-ignore
//     const label = svg.append("g")
//         .attr("class", "labels fill-current text-xs")
//         .selectAll("text")
//         .data(graph.nodes)
//         .enter()
//         .append("text")
//         .attr('text-anchor', 'middle')
//         .attr('dominant-baseline', 'central')
//         // @ts-ignore
//         .text(d => `${d.id}:${d.label}`)
//         // @ts-ignore
//         .on("click", d => onNodeClick(d.id))
//         // @ts-ignore
//         .call(drag(simulation));


//     simulation.on("tick", () => {
//         //update link positions
//         link
//             // // @ts-ignore
//             // .attr("x1", d => d.source.x)
//             // // @ts-ignore
//             // .attr("y1", d => d.source.y)
//             // // @ts-ignore
//             // .attr("x2", d => d.target.x)
//             // // @ts-ignore
//             // .attr("y2", d => d.target.y);
//             .attr('d', linkArc)

//         // update node positions
//         node
//             // @ts-ignore
//             .attr("cx", d => d.x)
//             // @ts-ignore
//             .attr("cy", d => d.y);

//         // update label positions
//         label
//             // @ts-ignore
//             .attr("x", d => { return d.x; })
//             // @ts-ignore
//             .attr("y", d => { return d.y; })
//     });

// }