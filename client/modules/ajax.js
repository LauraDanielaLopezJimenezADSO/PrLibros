//importamos la constaante
import { URL } from "./config.js"
//resibe como parametro el endpoint
const solicitud = async (url) => {
    const _fetch = await fetch(`${URL}/${url}`)
    const _json = await _fetch.json()
    return _json
    ///retorna una promesa
}
export const envia = async(endpoints, options) => {
    try {
        let solicitud = await(fetch(`${URL}/${endpoints}`, options))
        let data = await solicitud.json()
        return data
    } catch (error) {
        return error
    }
}

export default solicitud;