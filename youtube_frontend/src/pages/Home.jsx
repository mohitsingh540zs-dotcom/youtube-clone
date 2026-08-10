import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import VideoGrid from "../components/VideoGrid";
import useVideos from "../hooks/useVideos";
import { searchVideo, videosByCategories } from "../api/video";

const Home = () => {
  const { videos, loading, error } = useVideos();
  const [displayVideos, setDisplayVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayVideos(videos);
  }, [videos]);

  const handleSearch = async () => {
    if (!search.trim()) {
      setDisplayVideos(videos);
      return;
    }

    try {
      const data = await searchVideo(search);

      setDisplayVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = async (category) => {
    if (category === "All") {
      setDisplayVideos(videos);
      return;
    }

    console.log("Category:", category);

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
