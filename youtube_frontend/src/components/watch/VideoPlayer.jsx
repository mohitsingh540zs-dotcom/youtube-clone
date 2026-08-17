const VideoPlayer = ({ video }) => {
  if (!video) {
    return (
      <div className="w-full aspect-video bg-black rounded-xl animate-pulse"></div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video src={video?.videoUrl} controls className="w-full h-full"></video>
    </div>
  );
};

export default VideoPlayer;
