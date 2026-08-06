import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const CommentCard = ({ comment }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const closeMenu = () => setIsOpen(false);

        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);
    console.log(comment);

    return (
        <div className="flex gap-3 py-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex-shrink-0">
                {comment?.owner?.avatar ? (
                    <img src={comment?.owner?.avatar} alt={comment?.owner?.username} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-600 text-white font-bold rounded-full">
                        {comment?.owner?.username.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Comment */}
            <div className="flex-1">

                <div className="flex items-center gap-3">
                    <h3 className="font-semibold">
                        {comment?.owner?.username}
                    </h3>

                    <span className="text-sm text-gray-500">
                        2 days ago
                    </span>
                </div>

                <p className="mt-2 text-gray-800">
                    {comment?.text}
                </p>

            </div>

            {/* Menu */}
            <div className="relative">

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                    className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center"
                >
                    <EllipsisVertical size={20} />
                </button>

                {isOpen && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-12 right-0 w-36 bg-white rounded-xl shadow-xl py-2 z-20"
                    >
                        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                            <Pencil size={18} />
                            Edit
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-red-500">
                            <Trash size={18} />
                            Delete
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
};

export default CommentCard;