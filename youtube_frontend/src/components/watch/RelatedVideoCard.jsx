import { Link } from "react-router-dom";

const RelatedVideoCard = ({ video }) => {
    return (
        <Link
            to={`/watch/${video._id}`}
            className="flex gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
        >
            <img
                src={video?.thumbnail}
                alt={video?.title}
                className="w-44 aspect-video rounded-xl object-cover flex-shrink-0"
            />

            <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-sm leading-5 line-clamp-2">
                    {video?.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    {video?.channel?.channelName}
                </p>

                <p className="text-xs text-gray-500">
                    {video?.views ?? 0} views •{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                </p>
            </div>
        </Link>
    );
};

export default RelatedVideoCard;