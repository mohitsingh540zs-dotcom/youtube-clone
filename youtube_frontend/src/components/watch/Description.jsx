import { useState } from "react";

const Description = ({ video }) => {
    const [showMore, setShowMore] = useState(false);

    return (

        <div className="mt-5 bg-gray-100 rounded-2xl p-4">

            {/* Views & Date */}
            <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{video?.views || 0} views</span>
                    <span>•</span>
                    <span>
                        {video?.createdAt &&
                            new Date(video.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p
                className={`mt-3 whitespace-pre-line ${showMore ? "" : "line-clamp-3"
                    }`}
            >
                {video?.description}
            </p>

            {/* Show More */}
            <button
                onClick={() => setShowMore(!showMore)}
                className="mt-3 font-semibold hover:underline"
            >
                {showMore ? "Show less" : "Show more"}
            </button>

        </div>
    );
};

export default Description;