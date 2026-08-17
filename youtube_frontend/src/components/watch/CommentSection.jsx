import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import {
    createComment,
    getAllComments,
} from "../../api/comment";

const CommentSection = ({ videoId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const data = await getAllComments(videoId);
            setComments(data.comments);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchComments();
    }, [videoId]);


    const addComment = async (text) => {
        try {
            await createComment(videoId, text);
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-80 md:h-fit mt-6 flex flex-col gap-6 bg-gray-100 overflow-auto p-3 rounded-2xl">

            <div className="flex items-center gap-6">
                <h2 className="font-semibold text-lg">
                    {comments.length} Comments
                </h2>

                <button className="text-sm text-gray-600">
                    Sort by
                </button>
            </div>

            <CommentInput onSubmit={addComment} />

            <div className="flex flex-col gap-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500">
                        No comments yet. Be the first to comment.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment}
                            refreshComments={fetchComments}
                        />
                    ))
                )}
            </div>

        </div>
    );
};

export default CommentSection;