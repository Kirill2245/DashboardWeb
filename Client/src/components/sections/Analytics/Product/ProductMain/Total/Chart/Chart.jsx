import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';

const ChartProduct = ({ date = []}) => {
    const width = 363;
    const height = 98;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (!date || !Array.isArray(date)) {
        console.error("Некорректные данные для графика:", date);
        return (
            <svg width={width} height={height}>
                <text x="50%" y="50%" textAnchor="middle" fill="red">
                    Нет данных
                </text>
            </svg>
        );
    }
    const countByDate = date.reduce((acc, item) => {
        if (!item || !item.date) return acc;
        
        try {
            const dateObj = new Date(item.date);
            if (isNaN(dateObj.getTime())) return acc;
            
            const dateStr = dateObj.toISOString().split('T')[0];
            acc[dateStr] = (acc[dateStr] || 0) + 1;
            return acc;
        } catch (e) {
            console.error("Ошибка обработки даты:", item.date, e);
            return acc;
        }
    }, {});

    const processedData = Object.entries(countByDate)
        .map(([dateStr, count]) => {
            try {
                const dateObj = new Date(dateStr);
                if (isNaN(dateObj.getTime())) return null;
                return { date: dateObj, count };
            } catch (e) {
                console.error("Ошибка создания даты:", dateStr, e);
                return null;
            }
        })
        .filter(Boolean)
        .sort((a, b) => a.date - b.date);

    const validData = processedData.filter(d => d && d.date && !isNaN(d.count));
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
            .domain([0, Math.max(...validData.map(d => d.count))])
            .range([innerHeight, 0])
        : null;

    const lineGenerator = hasData
        ? line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.count))
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
                    d={areaPathD || ''}
                    fill="url(#diagonalGradient)"
                />
                <path
                    d={pathD || ''}
                    fill="none"
                    stroke="#5B93FF"
                    strokeWidth="3"
                    filter="url(#shadow)"
                />
            </g>
        </svg>
    );
};

export default ChartProduct;