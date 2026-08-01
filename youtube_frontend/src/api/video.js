import api from "./axios";

export const getAllVideos = async () => {
    const { data } = await api.get("videos/getVideo");
    return data;
}

export const getVideoById = async (id) => {
    const { data } = await api.get(`videos/getvideo/${id}`);
    return data;
} 