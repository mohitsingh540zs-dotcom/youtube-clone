import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import VideoGrid from "../components/VideoGrid";
import useVideos from "../hooks/useVideos";
import { videosByCategories } from "../api/video";

const Home = () => {
  const { videos, loading, error } = useVideos();
  const [displayVideos, setDisplayVideos] = useState([]);

  useEffect(() => {
    setDisplayVideos(videos);
  }, [videos]);

  const handleCategory = async (category) => {
    if (category === "All") {
      setDisplayVideos(videos);
      return;
    }

    try {
      const data = await videosByCategories(category);
      setDisplayVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="space-y-6">
      <Categories onCategoryChange={handleCategory} />

      <VideoGrid videos={displayVideos} />
    </div>
  );
};

export default Home;
