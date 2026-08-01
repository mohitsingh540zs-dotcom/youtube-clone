import { useState } from "react";

const Description = () => {
    const [showMore, setShowMore] = useState(false);

    const description =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam porro laboriosam reprehenderit ipsum rem, laborum suscipit magni eos officiis. Quidem eius est beatae ratione aspernatur natus vero. Cupiditate, accusamus voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, dolorem.";

    return (
        <div className="mt-5 bg-gray-100 rounded-2xl p-4">

            {/* Views & Date */}
            <div className="flex items-center gap-2 font-medium">
                <span>654K views</span>
                <span>•</span>
                <span>2 days ago</span>
            </div>

            {/* Description */}
            <p
                className={`mt-3 whitespace-pre-line ${showMore ? "" : "line-clamp-3"
                    }`}
            >
                {description}
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