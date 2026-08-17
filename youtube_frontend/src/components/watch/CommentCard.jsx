import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteComment, updateComment } from "../../api/comment";

const CommentCard = ({ comment, refreshComments }) => {
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(comment.text);

    const isOwner = user?._id === comment.owner._id;

    useEffect(() => {
        const closeMenu = () => setIsOpen(false);

        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    const handleUpdate = async () => {
        if (!text.trim()) return;

        try {
            await updateComment(comment._id, text);

            setEditing(false);
            refreshComments();

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Delete this comment?"
        );

        if (!confirmDelete) return;

        try {
            await deleteComment(comment._id);
            refreshComments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex gap-3 py-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border border-gray-400">

                {comment?.owner?.avatar ? (
                    <img
                        src={comment.owner.avatar}
                        alt={comment.owner.username}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                        {comment.owner.username.charAt(0).toUpperCase()}
                    </div>
                )}

            </div>

            {/* Content */}
            <div className="flex-1">

                <div className="flex items-center gap-3">

                    <h3 className="font-semibold">
                        @{comment.owner.username}
                    </h3>

                    <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>

                </div>

                {editing ? (

                    <div className="mt-2">

                        <textarea
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full border rounded-lg p-2 outline-none resize-none"
                        />

                        <div className="flex justify-end gap-2 mt-3">

                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setText(comment.text);
                                }}
                                className="px-4 py-2 rounded-full hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                ) : (

                    <p className="mt-2 text-gray-800 whitespace-pre-wrap">
                        {comment.text}
                    </p>

                )}

            </div>

            {/* Owner Menu */}
            {isOwner && !editing && (

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

                            <button
                                onClick={() => {
                                    setEditing(true);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                            >
                                <Pencil size={18} />
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                                <Trash size={18} />
                                Delete
                            </button>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
};

export default CommentCard;