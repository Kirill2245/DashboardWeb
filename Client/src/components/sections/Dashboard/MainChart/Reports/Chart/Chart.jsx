
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import SvgUnion from './SvgUnion/SvgUnion';

const Chart = ({ salesData }) => {
const svgRef = useRef();
    const [activePoint, setActivePoint] = useState(null);

    useEffect(() => {
        if (!salesData || salesData.length === 0) return;

        const svg = d3.select(svgRef.current);
        const container = svg.node().getBoundingClientRect();
        const width = container.width;
        const height = container.height;
        
        const margin = { top: 10, right: 0, bottom: 32, left: 24 };

        svg.selectAll("*").remove();
        svg.attr('width', width).attr('height', height);
                const defs = svg.append('defs');
        
        const gradient = defs.append('linearGradient')
            .attr('id', 'line-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#5BC4FF');

        gradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', '#9A9CF9');

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#FF5BEF');
        const areaGradient = defs.append('linearGradient')
            .attr('id', 'area-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        areaGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#5BC4FF')
            .attr('stop-opacity', 0.08); 

        areaGradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', '#9A9CF9')
            .attr('stop-opacity', 0.08);

        areaGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#FF5BEF')
            .attr('stop-opacity', 0.08);

        const hours = salesData.map(d => new Date(d.dateSales).getHours());
        const uniqueHours = [...new Set(hours)].sort((a, b) => a - b);
        
        let hourTicks;
        if (uniqueHours.length > 10) {
            const minHour = Math.min(...uniqueHours);
            const maxHour = Math.max(...uniqueHours);
            hourTicks = [];
            for (let i = minHour; i <= maxHour; i += 2) {
                hourTicks.push(i);
            }
        } else {
            hourTicks = uniqueHours;
        }

        const hourlyData = hourTicks.map(hour => {
            const hourSales = salesData.filter(d => new Date(d.dateSales).getHours() === hour);
            const totalCount = d3.sum(hourSales, d => d.count);
            const salesCount = hourSales.length;
            return {
                hour,
                totalCount,
                salesCount
            };
        });

        const xScale = d3.scaleBand()
            .domain(hourTicks.map(h => h.toString()))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(hourlyData, d => d.salesCount) || 1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(d.hour.toString()) + xScale.bandwidth() / 2)
            .y(d => yScale(d.salesCount))
            .curve(d3.curveMonotoneX);
        const area = d3.area()
            .x(d => xScale(d.hour.toString()) + xScale.bandwidth() / 2)
            .y0(height - margin.bottom) 
            .y1(d => yScale(d.salesCount)) 
            .curve(d3.curveMonotoneX);
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d => `${d}am`)
            .tickSize(0) 
            .tickPadding(10);

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d => {
                return d % 2  ? '' : d
            })
            .tickSize(0) 
            .tickPadding(10);


        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#666")
            .style("width", "32px")

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "14px")
            .style("fill", "#666");
            

        svg.selectAll('.domain').remove();
        svg.selectAll('.tick line').remove();
        svg.append('path')
            .datum(hourlyData)
            .attr('fill', 'url(#area-gradient)') 
            .attr('stroke', 'none')
            .attr('d', area);
        svg.append('path')
            .datum(hourlyData)
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient)')
            .attr('stroke-width', 3)
            .attr('d', line);


        svg.selectAll('.point')
            .data(hourlyData)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', d => xScale(d.hour.toString()) + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(d.salesCount))
            .attr('r', 5)
            .attr('fill', 'url(#line-gradient)')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .on('mouseover', (event, d) => {
                const point = event.target;
                const pointRect = point.getBoundingClientRect();
                
                setActivePoint({
                    hour: d.hour,
                    totalCount: d.totalCount,
                    x: pointRect.left + pointRect.width / 2,
                    y: pointRect.top
                });
            })
            .on('mouseout', () => {
                setActivePoint(null);
            });

    }, [salesData]);


    return (
        <div style={{ width: '100%', height: 'calc(100% - 40px)', padding: '10px 0 30px 24px', boxSizing: 'border-box' }} >
            <svg 
                ref={svgRef} 
                style={{ 
                    width: '100%', 
                    height: '100%',
                    display: 'block' 
                }}
            ></svg>
            
            {activePoint && (
                <SvgUnion activePoint={activePoint}/>
            )}
            
        </div>
    );
};

export default Chart;