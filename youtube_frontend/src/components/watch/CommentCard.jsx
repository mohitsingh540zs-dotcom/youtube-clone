import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const CommentCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const closeMenu = () => setIsOpen(false);

        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    return (
        <div className="flex gap-3 py-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-black flex-shrink-0"></div>

            {/* Comment */}
            <div className="flex-1">

                <div className="flex items-center gap-3">
                    <h3 className="font-semibold">
                        @UserHandle
                    </h3>

                    <span className="text-sm text-gray-500">
                        2 days ago
                    </span>
                </div>

                <p className="mt-2 text-gray-800">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit iste, quia provident delectus veniam animi atque
                    suscipit vero alias explicabo facere non incidunt!
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