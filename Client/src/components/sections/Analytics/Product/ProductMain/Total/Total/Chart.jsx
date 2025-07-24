
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';

const ChartProduct = ({date = [], flag = true}) => {

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
        <>
            {
                flag?
                (
                    <svg width={width} height={height}>
                        <defs>
                            <linearGradient id="diagonalGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#ffffffff', stopOpacity: 1 }} />
                                <stop offset="30%" style={{ stopColor: '#f0f2fcff', stopOpacity: 1 }} />
                                <stop offset="60%" style={{ stopColor: '#d9dff8ff', stopOpacity: 1 }} />
                                <stop offset="90%" style={{ stopColor: '#9dacf0ff', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#3358ff83', stopOpacity: 1 }} />
                            </linearGradient>
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" />
                                <feOffset dx="-1" dy="2.9" result="offsetblur" />
                                <feFlood floodColor="#0156ff3d" />
                                <feComposite in2="offsetblur" operator="in" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g transform={`translate(${margin.left}, ${margin.top})`}>

                            <path
                                d={`${lineGenerator(date)} L ${width - margin.left - margin.right} ${height - margin.top} L ${margin.left} ${height - margin.top} Z`}
                                fill="url(#diagonalGradient)"
                            />
                            <path
                                d={lineGenerator(date)}
                                fill="none"
                                stroke="#5B93FF"
                                strokeWidth="3"
                                filter="url(#shadow)"
                            />
                        </g>
                    </svg>
                ):
                (
                    <svg width={width} height={height}>
                        <defs>
                            <linearGradient id="diagonalGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#ffffffff', stopOpacity: 1 }} />
                                <stop offset="20%" style={{ stopColor: '#fcfbf9ff', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#faf4e6ff', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#FFD66B', stopOpacity: 1 }} />
                            </linearGradient>
                            <filter id="shadow1" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" />
                                <feOffset dx="-1" dy="2.9" result="offsetblur" />
                                <feFlood floodColor="#FFD66B" />
                                <feComposite in2="offsetblur" operator="in" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g transform={`translate(${margin.left}, ${margin.top})`}>

                            <path
                                d={`${lineGenerator(date)} L ${width - margin.left - margin.right} ${height - margin.top} L ${margin.left} ${height - margin.top} Z`}
                                fill="url(#diagonalGradient1)"
                            />
                            <path
                                d={lineGenerator(date)}
                                fill="none"
                                stroke="#FFD66B"
                                strokeWidth="3"
                                filter="url(#shadow1)"
                            />
                        </g>
                    </svg>
                )
            }
        </>

    );

};

export default ChartProduct;