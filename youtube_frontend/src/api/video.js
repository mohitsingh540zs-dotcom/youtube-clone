import api from "./axios";

export const getAllVideos = async () => {
    const { data } = await api.get("videos/getVideo");
    return data;
}

export const getVideoById = async (id) => {
    const { data } = await api.get(`videos/getvideo/${id}`);
    return data;
}

export const uploadVideo = async (formData) => {
    const { data } = await api.post("/videos/upload", formData);
    return data;
}

export const getMyVideos = async () => {
    const { data } = await api.get("/videos/getMyVideos");
    return data.videos;
}

export const deleteVideo = async (id) => {
    const { data } = await api.delete(`/videos/delete/${id}`);
    return data;
}

export const editVideo = async (id, formData) => {
    const { data } = await api.patch(`/videos/update/${id}`, formData);
    return data;

}
