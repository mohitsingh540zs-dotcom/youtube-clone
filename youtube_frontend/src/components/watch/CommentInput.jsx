import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const CommentInput = ({ onSubmit }) => {
    const { user } = useAuth();

    const [text, setText] = useState("");
    const [focused, setFocused] = useState(false);

    const handleComment = () => {
        if (!text.trim()) return;

        onSubmit(text);

        setText("");
        setFocused(false);
    };

    const handleCancel = () => {
        setText("");
        setFocused(false);
    };

    return (
        <div className="flex gap-3 mt-6">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">

                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-600 text-white font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                )}

            </div>

            {/* Input */}
            <div className="flex-1">

                <textarea
                    rows={1}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full resize-none border-b outline-none py-2"
                    onFocus={() => setFocused(true)}
                />

                {focused && (
                    <div className="flex justify-end gap-3 mt-3">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-full hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleComment}
                            disabled={!text.trim()}
                            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Comment
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
};

export default CommentInput;