


// read file as DataURL (base64 url)
const readAsUrl = async (file: Blob) => new Promise<string>(
    (res, rej) => {
        const reader = new FileReader()
        reader.onload = ev => res(ev?.target?.result as string)
        reader.onerror = ev => rej(ev)
        //reader.readAsArrayBuffer(file)
        reader.readAsDataURL(file)
    }
)



const round = (n:number, scale:number = 0) => {
    const mult = (n<0?-1:1) * 10**scale
    return Math.round(n * mult) / mult
}
const numberToPlainString = (n: number) => {
    return n.toLocaleString(
        ['fullwide', 'en-Us'],
        { useGrouping: false, maximumSignificantDigits: 21 }
    )
}
const getPercent = (value: number, total: number, scale: number = 1) => {
    return utils.numberToPlainString(utils.round(value*100/total,scale))
}
const mod = (a: number,b: number) => (a+b)%b
const fitInto = (min: number, curr: number, max: number) => curr<min ? min : curr>max ? max : curr
const inRange = (min: number, curr: number, max: number) => curr>=min && curr<=max



const isArray = <T,E>(obj: T|E[]): obj is Array<E> => obj instanceof Array



const toggleInSet = <E>(set: Set<E>, element: E) => {
    if (set.has(element)) set.delete(element)
    else set.add(element)
    return set
}



export const utils = {
    readAsUrl,
    round,
    numberToPlainString,
    getPercent,
    mod,
    fitInto,
    inRange,
    isArray,
    toggleInSet,
}