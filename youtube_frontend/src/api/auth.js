import api from "./axios";

export const register = async (credentials) => {
    const { data } = await api.post("/auth/register", credentials);
    return data;
}

export const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
}

export const getMe = async () => {
    const { data } = await api.get("/auth/me");
    return data;
}

export const logout = async () => {
    const { data } = await api.post("/auth/logout");
    return data
}