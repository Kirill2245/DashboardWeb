export function formatIndianNumber(number) {
    const numStr = Math.floor(number).toString();
    const len = numStr.length;
    
    if (len <= 3) return numStr;
    
    let result = [];
    result.unshift(numStr.substring(len - 3));
    
    for (let i = len - 3; i > 0; i -= 2) {
        const start = Math.max(0, i - 2);
        result.unshift(numStr.substring(start, i));
    }
    
    return result.join(',');
}