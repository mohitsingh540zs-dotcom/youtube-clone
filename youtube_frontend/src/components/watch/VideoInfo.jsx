import { Download, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { createLike, getLikesStatus, unLike } from "../../api/like";
import useSubscription from "../../hooks/useSubscription";

const VideoInfo = ({ video }) => {
  const { user } = useAuth();

  const { subscribed, subscribers, toggleSubscription } = useSubscription(
    video?.channel?._id,
  );
  const isOwner = user?.channel === video?.channel?._id;

  const channelLink = isOwner ? "/profile" : `/channel/${video?.channel?._id}`;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video?.likes || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  useState(() => {
    if (!video?._id) return;

    setLikes(video.likes || 0);

    const fetchLikes = async () => {
      try {
        const data = await getLikesStatus(video._id);

        setLiked(data.liked);
        setLikes(data.likes);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setLiked(false);
        } else {
          console.log("Like status error:", error);
        }
      }
    };
    fetchLikes();
  }, [video?._id, video?.likes]);

  const handleLike = async () => {
    if (likeLoading) return;

    try {
      if (liked) {
        const data = await unLike(video._id);

        setLiked(false);
        setLikes(data.likes);
      } else {
        const data = await createLike(video._id);

        setLiked(true);
        setLikes(data.likes);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Unable to update like");
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{video?.title}</h1>

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link to={channelLink}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                {video?.owner?.avatar ? (
                  <img
                    src={video?.owner?.avatar}
                    alt={video?.owner?.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-red-500 text-white font-bold flex items-center justify-center rounded-full text-xl">
                    {video?.owner?.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>

            <div>
              <Link to={channelLink} className="font-semibold hover:underline">
                {video?.channel?.channelName}
              </Link>

              <p className="text-sm text-gray-500">
                {subscribers} subscribers
              </p>
            </div>
          </div>

          {!isOwner && (
            <button
              onClick={toggleSubscription}
              className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition"
            >
              <ThumbsUp size={20} fill={liked ? "currentColor" : "none"} />
              {likes} likes
            </button>

            <div className="w-px h-6 bg-gray-300" />

            <button
              onClick={handleLike}
              className="px-4 py-2 hover:bg-gray-200 transition"
            >
              <ThumbsDown size={20} fill={liked ? "none" : "currentColor"} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Share2 size={20} />
            Share
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Download size={20} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
