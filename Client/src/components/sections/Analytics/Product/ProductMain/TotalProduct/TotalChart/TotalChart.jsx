
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';

const ChartComponent = ({date = []}) => {

    const width = 363;
    const height = 98;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleTime()
        .domain(extent(date, d => d.date))
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain([0, Math.max(...date.map(d => d.count))])
        .range([innerHeight, 0]);

    const lineGenerator = line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.count));

    return (
        <svg width={width} height={height}>
            <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="11" />
                    <feOffset dx="-1" dy="11" result="offsetblur" />
                    <feFlood flood-color="#0156ffa1" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                
            </defs>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <path
                    d={lineGenerator(date)}
                    fill="none"
                    stroke="#5B93FF"
                    strokeWidth="3"
                    filter="url(#shadow)"
                />
            </g>
        </svg>
    );

};

export default ChartComponent;