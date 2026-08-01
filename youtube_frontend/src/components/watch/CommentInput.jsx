import { useState } from "react";

const CommentInput = () => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="flex gap-3 mt-6">

            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>

            <div className="flex-1">

                <textarea
                    rows={1}
                    placeholder="Add a comment..."
                    className="w-full resize-none border-b outline-none py-2"
                    onFocus={() => setFocused(true)}
                />

                {focused && (

                    <div className="flex justify-end gap-3 mt-3">

                        <button onClick={() => setFocused(false)} className="px-4 py-2 rounded-full hover:bg-gray-100">
                            Cancel
                        </button>

                        <button className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                            Comment
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
};

export default CommentInput