import Categories from "../components/Categories"
import VideoGrid from "../components/VideoGrid"
import useVideos from "../hooks/useVideos"

const Home = () => {
  const { videos,
    loading,
    error } = useVideos();

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (error) {
    return (
      <h1>{error}</h1>
    )
  }

  return (
    <div className='space-y-6'>
      <Categories />

      <VideoGrid videos={videos} />
    </div>
  )
}

export default Home