import axios from "axios";

export const getWithCredential = async (url: string) => {
    const res = await axios.get(url, {
        withCredentials: true
    })
    return res.data
}

export const postWithCredential = async (url: string, body = {}) => {
    const res = await axios.post(url, { ...body }, {
        withCredentials: true
    })
    return res.data
}