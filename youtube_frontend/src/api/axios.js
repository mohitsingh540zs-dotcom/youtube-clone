import axios from "axios";

const api = axios.create({
  baseURL: "https://youtube-clone-1-m9ve.onrender.com",
  withCredentials: true,
});

export default api;
