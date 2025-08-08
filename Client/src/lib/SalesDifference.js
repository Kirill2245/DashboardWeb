export function calculateSalesDifference(data) {
    const salesByDay = data.reduce((acc, item) => {
        const dateStr = new Date(item.date).toISOString().split('T')[0]; 
        
        if (!acc[dateStr]) {
        acc[dateStr] = 0;
        }
        acc[dateStr] += item.sale;
        
        return acc;
    }, {});

    const dailySales = Object.entries(salesByDay).map(([dateStr, total]) => ({
        date: new Date(dateStr),
        total
    }));

    dailySales.sort((a, b) => a.date - b.date);

    if (dailySales.length === 0) return 0;

    const totalSales = data.reduce((sum, item) => sum + item.sale, 0);

    const minDateSales = dailySales[0].total;

    return [totalSales - minDateSales , totalSales];
}

export function calculateProductDifference(products) {
    if (!products || products.length === 0) return 0;

    const sortedProducts = products
        .map(p => ({ ...p, date: new Date(p.date) }))
        .sort((a, b) => a.date - b.date);

    const firstDay = sortedProducts[0].date.toISOString().split('T')[0];

    const productsAfterFirstDay = sortedProducts.filter(p => {
        const productDay = p.date.toISOString().split('T')[0];
        return productDay !== firstDay;
    });

    return productsAfterFirstDay.length;
}