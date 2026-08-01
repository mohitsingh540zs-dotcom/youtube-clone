import CommentCard from "./CommentCard"
import CommentInput from "./CommentInput"

const CommentSection = () => {
    return (
        <div className="mt-2 flex flex-col gap-4">
            <div className="flex gap-6">
                <p>Total Comments</p>
                <p>Sort by</p>
            </div>

            <CommentInput />

            <div className="flex flex-col gap-2 ">
                {[1, 2, 3, 4, 5].map(item => <CommentCard key={item} />)}
            </div>
        </div>
    )
}

export default CommentSection