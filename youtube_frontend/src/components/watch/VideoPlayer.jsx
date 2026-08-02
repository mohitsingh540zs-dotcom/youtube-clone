const VideoPlayer = ({ video }) => {
  if (!video) {
    return (
      <div className="w-full aspect-video bg-black rounded-xl animate-pulse"></div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/J9p5dUNbm5U"
        title="YouTube video player"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;