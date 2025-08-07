export const sortProduct = (arr) => {
    if (!Array.isArray(arr)) return [];
    
    return [...arr].sort((a, b) => {
        const ordersA = Number(a?.numberOrders) || 0;
        const ordersB = Number(b?.numberOrders) || 0;
        return ordersB - ordersA; 
    });
}