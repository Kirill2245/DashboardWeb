export const sortProduct = (arr) => {
    return [...arr].sort((a, b) => a.numberOrders - b.numberOrders)
}