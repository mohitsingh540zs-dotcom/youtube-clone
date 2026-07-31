import api from "./axios";

export const getAllVideos = async () => {
    const { data } = await api.get("videos/getVideo");
    return data;
}