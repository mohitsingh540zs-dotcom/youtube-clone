import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchVideo } from "../api/video";
import VideoGrid from "../components/VideoGrid";

const Search = () => {
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await searchVideo(title);

        setVideos(data.videos);
      } catch (error) {
        setError(error?.response?.data?.message || "Something Went Wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <VideoGrid videos={videos} />
    </div>
  );
};

export default Search;
