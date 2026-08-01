import CommentInput from "./CommentInput"

const CommentSection = () => {
    return (
        <div>
            <div className="flex gap-6">
                <p>Total Comments</p>
                <p>Sort by</p>
            </div>

            <CommentInput />
        </div>
    )
}

export default CommentSection