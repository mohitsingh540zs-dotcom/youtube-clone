import { Link, useParams } from "react-router-dom";
import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import Description from "../components/watch/Description";
import CommentSection from "../components/watch/CommentSection";
import RelatedVideos from "../components/watch/RelatedVideos";
import useVideo from "../hooks/useVideo";

const Watch = () => {
  const { id } = useParams();
  const { video, loading } = useVideo(id);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="text-7xl mb-6">📹</div>

        <h1 className="text-3xl font-bold">Video not found</h1>

        <p className="text-gray-500 mt-3 max-w-md">
          The video you're looking for doesn't exist, has been removed, or the
          URL is invalid.
        </p>

        <Link
          to="/"
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto min-h-screen">
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="flex-1">
          <VideoPlayer video={video} />
          <VideoInfo video={video} />
          <Description video={video} />
          <CommentSection videoId={id} />
        </div>
        <div className="xl:w-[380px] w-full overflow-y-auto">
          <RelatedVideos videoId={video._id} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
