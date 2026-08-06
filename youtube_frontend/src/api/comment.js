import api from "./axios"

export const createComment = async (id, text) => {
    const { data } = await api.post(`comment/create/${id}`, {
        text
    });

    return data.comment;
}

export const getAllComments = async (id) => {
    const { data } = await api.get(`comment/video/${id}`);
    return data;
}



