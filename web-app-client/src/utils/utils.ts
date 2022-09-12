


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





export const utils = {
    readAsUrl,
}