import { useEffect, useState } from "react";
import { getAllVideos } from "../api/video.js";

const useVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);

                const data = await getAllVideos();

                setVideos(data.videos);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return {
        videos,
        loading,
        error
    };
};

export default useVideos;