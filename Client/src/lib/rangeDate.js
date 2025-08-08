export const rangeDate = (data, startDate, endDate) => {
    if (!data || !Array.isArray(data)) return [];
    if (!startDate || !endDate) return data;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return data.filter(item => {
        if (!item.date) return false;
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
    });
};