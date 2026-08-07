import React, { useEffect, useState } from 'react'
import { getVideoById } from '../api/video';

const useVideo = (id) => {

    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const data = await getVideoById(id);

                setVideo(data.video);
            } catch (error) {
                setVideo(null);
                setError(error.response?.data.message || "Something Went Wrong");
            }
            finally {
                setLoading(false);
            }
        }
        fetchVideo();
    }, [id]);

    return { video, loading, error }
}

export default useVideo