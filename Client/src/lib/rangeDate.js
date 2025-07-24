export function rangeDate(arr, start, end){
    let result = []
    for (let elem of arr){
        if (elem.date >= start && elem.date <= end){
            result.push(elem)
        }
    }
    return result
}