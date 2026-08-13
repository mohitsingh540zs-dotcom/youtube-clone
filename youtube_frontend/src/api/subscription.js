import api from "./axios";

export const subscribeChannel = async (channelId) => {
  const { data } = await api.post(`/subscription/subscribe/${channelId}`);
  return data;
};

export const unsubscribeChannel = async (channelId) => {
  const { data } = await api.delete(`/subscription/unsubscribe/${channelId}`);
  return data;
};

export const subscribeStatus = async (channelId) => {
  const { data } = await api.get(`/subscription/getStatus/${channelId}`);
  return data;
};
