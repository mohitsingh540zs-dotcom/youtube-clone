import api from "./axios";

export const register = async (credentials) => {
    const { data } = await api.post("/auth/register", credentials);
    return data;
}

export const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data.user;
}

export const getMe = async () => {
    const { data } = await api.get("/auth/me");
    return data;
}

export const logout = async () => {
    const { data } = await api.post("/auth/logout");
    return data
}

export const updateAvatar = async (formData) => {
    const { data } = await api.put("/auth/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};