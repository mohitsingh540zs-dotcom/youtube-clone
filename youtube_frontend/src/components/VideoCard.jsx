import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../utils/data";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="block p-3 sm:p-4 rounded-xl hover:bg-gray-200 transition"
    >
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-fill rounded-xl"
          loading="lazy"
        />
      </div>

      <div className="flex gap-3 items-start mt-4">
        {/* Avatar */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0 overflow-hidden">
          {video?.owner?.avatar ? (
            <img
              src={video.owner.avatar}
              alt={video.owner.username}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-full text-lg sm:text-xl text-white bg-red-400 flex items-center justify-center font-bold">
              {video?.owner?.username?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h2 className="text-base sm:text-lg md:text-xl font-medium line-clamp-2 break-words">
            {video.title}
          </h2>

          {/* Video information */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
            <p className="truncate max-w-[180px] sm:max-w-none">
              {video?.channel?.channelName}
            </p>

            <span className="hidden sm:inline">•</span>

            <p className="flex items-center gap-1">
              <Eye size={15} />
              {video.views}
            </p>

            <span className="hidden sm:inline">•</span>

            <p>{getTimeAgo(video.createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
