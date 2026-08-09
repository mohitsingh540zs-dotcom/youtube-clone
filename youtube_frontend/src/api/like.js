import api from "./axios"

export const createLike = async (videoId) => {
    const { data } = await api.post(`like/${videoId}`);
    return data;
}

export const unLike = async (videoId) => {
    const { data } = await api.delete(`like/${videoId}`);
    return data;
}

export const getLikesStatus = async (videoId) => {
    const { data } = await api.get(`like/status/${videoId}`);
    return data;
}