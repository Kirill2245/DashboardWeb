import React from 'react';
import * as d3 from 'd3';

const PieChart = ({ values = [30, 40, 30], width = 176, height = 176 }) => {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const center = { x: width / 2, y: height / 2 };
    const colors = ['#FF8F6B', '#5B93FF', '#FFD66B'];

    const data = [
        { label: 'Cancel', value: values[0] },
        { label: 'Sales', value: values[1] },
        { label: 'Order', value: values[2] }
    ].filter(d => d.value >= 0);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.7) 
        .outerRadius(radius)
        .padAngle(-0.10)
        .cornerRadius(4); 

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <g transform={`translate(${center.x}, ${center.y})`}>

                <circle cx="0" cy="0" r={radius} fill="#ffffffff" />
                
                {pie(data).map((d, i) => (
                    <path
                        key={`arc-${i}`}
                        d={arc(d)}
                        fill={colors[i]}
                    />
                ))}
                
                <circle cx="0" cy="0" r="29" fill="#5B93FF" fillOpacity="0.1"/>
            </g>
            <svg x="calc(50% - 12.5px)" y="calc(50% - 7px)"  overflow="visible"  width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.79656 13.5055C0.903622 13.6052 1.02916 13.6725 1.16125 13.7079C1.46053 13.7881 
                    1.79321 13.7043 2.01898 13.4617L7.96283 7.07612C8.28265 6.7325 8.7982 6.64125 9.21639 
                    6.85434L13.6333 9.10353C14.6268 9.60933 15.8223 9.47576 16.6794 8.76331L22.2679 4.11831L21.8481 
                    8.87238C21.8106 9.29712 22.0866 9.6772 22.4848 9.78382C22.5327 9.79666 22.5825 9.80557 22.6336 
                    9.81007C23.1094 9.8521 23.5292 9.5004 23.5713 9.02459L24.1847 2.07737C24.2049 1.84887 24.1335 
                    1.62169 23.9861 1.44584C23.8388 1.26997 23.6277 1.15981 23.3992 1.13968L16.7178 0.549694C16.242 0.507666 
                    15.8221 0.859362 15.7801 1.33518C15.7381 1.81105 16.0899 2.23075 16.5656 2.27286L21.2809 2.68926L15.5737 7.43293C15.2485 
                    7.7032 14.7951 7.75393 14.4183 7.56202L10.0013 5.31283C8.89895 4.75139 7.53974 4.99172 6.69665 5.89746L0.752782 12.2831C0.427329 
                    12.6327 0.446889 13.18 0.79656 13.5055Z" fill="#5B93FF"
                />
            </svg>
        </svg>
    );
};

export default PieChart;