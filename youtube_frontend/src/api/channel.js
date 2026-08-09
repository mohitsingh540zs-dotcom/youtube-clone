import api from "./axios";

export const createChannel = async (details) => {
  const { data } = await api.post("/channel/create", details);
  return data;
};

export const getMyChannel = async () => {
  const { data } = await api.get("/channel/get-me");
  return data.channel;
};

export const getChannel = async (id) => {
  const { data } = await api.get(`/channel/get/${id}`);
  return data.channel;
};

export const getVideosByChannel = async (id) => {
  const { data } = await api.get(`/channel/${id}/videos`);
  return data;
};

export const editChannel = async (formData) => {
  const { data } = await api.patch("/channel/update-me", formData);
  return data;
};
