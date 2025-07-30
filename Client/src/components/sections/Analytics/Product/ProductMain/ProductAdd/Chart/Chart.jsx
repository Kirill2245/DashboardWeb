
import * as d3 from 'd3';
import {formatIndianNumber} from '@lib/formatNumber.js'
const HorizontalBarChart = ({ data, width = 315, height = 223 }) => {
    if (!data || data.length === 0) return <svg width={width} height={height} />;

    const margin = { top: 0, right: 40, bottom: 0, left: 32 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const formattedData = data.map(d => ({
        ...d,
        date: new Date(d.date),
        value: +d.value
    }));

    const yScale = d3.scaleBand()
        .domain(formattedData.map(d => d.date))
        .range([0, innerHeight])
        .padding(0.3);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(formattedData, d => d.value)])
        .range([0, innerWidth])
        .nice();

    const generateBarPath = (d) => {
        const y = yScale(d.date) + (yScale.bandwidth() - 12) / 2;
        const barWidth = xScale(d.value);
        const radius = 6; 
        
        const effectiveRadius = Math.min(radius, barWidth);
        
        return `
            M0,${y}
            H${barWidth - effectiveRadius}
            Q${barWidth},${y} ${barWidth},${y + effectiveRadius}
            V${y + 12 - effectiveRadius}
            Q${barWidth},${y + 12} ${barWidth - effectiveRadius},${y + 12}
            H0
            Z
        `;
    };

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {formattedData.map((d, i) => (
                    <path
                        key={`bar-${i}`}
                        d={generateBarPath(d)}
                        fill={i % 2 === 0 ? "#FF8F6B" : "#5B93FF"}
                    />
                ))}

                {formattedData.map((d, i) => (
                    <text
                        key={`month-${i}`}
                        x={-10}
                        y={yScale(d.date) + yScale.bandwidth() / 2}
                        dy="0.35em"
                        textAnchor="end"
                        fontSize="12"
                        fill="#030229"
                    >
                        {d3.timeFormat("%b")(d.date)}
                    </text>
                ))}

                {formattedData.map((d, i) => (
                    <text
                        key={`value-${i}`}
                        x={xScale(d.value) + 15}
                        y={yScale(d.date) + yScale.bandwidth() / 2}
                        dy="0.35em"
                        fontSize="12"
                        fill="#030229"
                    >
                        {formatIndianNumber(d.value)}
                    </text>
                ))}
            </g>
        </svg>
    );
};

export default HorizontalBarChart;
