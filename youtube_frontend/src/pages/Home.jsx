import Categories from "../components/Categories"
import VideoGrid from "../components/VideoGrid"

const Home = () => {
  return (
    <div className='space-y-6'>
      <Categories />

      <VideoGrid />
    </div>
  )
}

export default Home