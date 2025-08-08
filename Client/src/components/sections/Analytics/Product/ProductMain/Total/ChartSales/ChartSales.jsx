import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';

const ChartSales = ({ date = [] }) => {
    const width = 363;
    const height = 98;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    console.log("Данные для графика:", date); 


    const validData = date
        .filter(d => d && d.date && !isNaN(d.sale))
        .map(d => ({
            ...d,
            date: new Date(d.date) 
        }))
        .sort((a, b) => a.date - b.date); 

    const hasData = validData.length > 0;

    if (!hasData) {
        return (
            <svg width={width} height={height}>
                <text x="50%" y="50%" textAnchor="middle" fill="#666">
                    Нет данных для отображения
                </text>
            </svg>
        );
    }

    const xScale = hasData 
        ? scaleTime()
            .domain(extent(validData, d => d.date))
            .range([0, innerWidth])
        : null;

    const yScale = hasData
        ? scaleLinear()
            .domain([0, Math.max(...validData.map(d => d.sale))])
            .range([innerHeight, 0])
        : null;

    const lineGenerator = hasData
        ? line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.sale))
        : null;

    const getPathD = () => {
        if (!lineGenerator || !validData.length) return '';
        return lineGenerator(validData);
    };

    const pathD = getPathD();
    const areaPathD = pathD 
        ? `${pathD} L ${innerWidth} ${innerHeight} L 0 ${innerHeight} Z`
        : '';


    return (
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
                    <feFlood floodColor="#ffd56b6b" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <path
                    d={areaPathD || ''}
                    fill="url(#diagonalGradient1)"
                />
                <path
                    d={pathD || ''}
                    fill="none"
                    stroke="#FFD66B"
                    strokeWidth="3"
                    filter="url(#shadow1)"
                />
            </g>
        </svg>
    );
};

export default ChartSales;