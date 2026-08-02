import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/watch/VideoPlayer';
import VideoInfo from '../components/watch/VideoInfo';
import Description from '../components/watch/Description';
import CommentSection from '../components/watch/CommentSection';
import RelatedVideos from '../components/watch/RelatedVideos';
import useVideo from '../hooks/useVideo';

const Watch = () => {
  const { id } = useParams();
  const { video } = useVideo(id);


  return (
    <div className='w-full max-w-[1800px] mx-auto min-h-screen'>
      <div className='flex flex-col xl:flex-row gap-2'>
        <div className='flex-1'>
          <VideoPlayer video={video} />
          <VideoInfo video={video} />
          <Description video={video} />
          <CommentSection />
        </div>
        <div className='xl:w-[380px] w-full overflow-y-auto'>
          <RelatedVideos videoId={video._id} />
        </div>
      </div>
    </div>
  )
}

export default Watch