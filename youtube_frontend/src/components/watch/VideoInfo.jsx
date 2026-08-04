import { Download, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VideoInfo = ({ video }) => {
    const { user } = useAuth();

    const isOwner = user?.channel === video?.channel?._id;

    const channelLink = isOwner
        ? "/profile"
        : `/channel/${video?.channel?._id}`;

    return (
        <div className="flex flex-col gap-3">

            <h1 className="text-2xl font-bold">
                {video?.title}
            </h1>

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                {/* Left */}
                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-3">

                        <Link to={channelLink}>
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                                <img
                                    src={video?.owner?.avatar}
                                    alt={video?.owner?.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Link>

                        <div>
                            <Link
                                to={channelLink}
                                className="font-semibold hover:underline"
                            >
                                {video?.channel?.channelName}
                            </Link>

                            <p className="text-sm text-gray-500">
                                {video?.channel?.subscribers?.length || 0} subscribers
                            </p>
                        </div>

                    </div>

                    {!isOwner && (
                        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                            Subscribe
                        </button>
                    )}

                </div>

                {/* Right */}
                <div className="flex flex-wrap gap-3">

                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">

                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition">
                            <ThumbsUp size={20} />
                            {video?.likes?.length || 0}
                        </button>

                        <div className="w-px h-6 bg-gray-300" />

                        <button className="px-4 py-2 hover:bg-gray-200 transition">
                            <ThumbsDown size={20} />
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