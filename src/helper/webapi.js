import axios from "axios";
import { baseUrl } from "./constant";


const getListWeb  = () => {
    return axios.get(baseUrl + '/web/')
            .then(response => response)
}


const createWeb = (webName,webURL) => {
    return axios.post(baseUrl + '/web/create',{
        webName,
        webURL
    })
}
const readImgSrcWeb = (webId) => {
    return axios.get(baseUrl + '/web/read?webId=', {params:{webId : webId.webId}})
}

const readWeb = (webId) => {
    return axios.get(baseUrl + '/web/about?webId=', {params:{webId : webId.webId}})
}

const updateWeb = (webId,webName,webURL) =>{
    return axios.patch(baseUrl + '/web/update',{
        webId,
        webName,
        webURL
    })
}

const deleteWeb = (webId) => {
    return axios.delete(baseUrl + '/web/delete?webId=',{params:{webId : webId}})
}

export {getListWeb , createWeb,readWeb ,updateWeb, readImgSrcWeb , deleteWeb}