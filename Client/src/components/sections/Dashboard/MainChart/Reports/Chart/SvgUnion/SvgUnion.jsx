
const SvgUnion = ({activePoint}) => {
    return(
        <svg 
            style={{
                position: 'absolute',
                top: activePoint.y - 90,
                left: activePoint.x - 51.5,
                pointerEvents: 'none',
                zIndex: 1000
            }}
            width="103" 
            height="78" 
            viewBox="0 0 103 78" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d)">
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M17 3C11.4772 3 7 7.47715 7 13V49C7 54.5228 11.4772 59 17 59H45.8038L50.134 66.5C50.5189 67.1667 51.4811 67.1667 51.866 66.5L56.1962 59H86C91.5229 59 96 54.5229 96 49V13C96 7.47715 91.5229 3 86 3H17Z" 
                    fill="#030229"
                />
            </g>
            <text
                x="51.5"
                y="30"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
            >
                Sales
            </text>
            <text
                x="51.5"
                y="50"
                textAnchor="middle"
                fill="white"
                fontSize="12"
            >
                {activePoint.totalCount}
            </text>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="103" height="78" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="3.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.00784314 0 0 0 0 0.160784 0 0 0 0.07 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
    );
};

export default SvgUnion