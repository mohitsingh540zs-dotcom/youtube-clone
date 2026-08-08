import useVideos from "../../hooks/useVideos"
import RelatedVideoCard from "./RelatedVideoCard"

const RelatedVideos = ({ videoId }) => {
    const { videos, loading } = useVideos();

    const relatedVideos = videos.filter(video => video._id !== videoId);

    if (loading) {
        return (
            <h1 className="text-lg bg-gray-500">Loading...</h1>
        )
    }

    return (
        <div className="w-full flex flex-col gap-4 p-2">
            {relatedVideos.length > 0 ? (
                relatedVideos.map((video) => (
                    <RelatedVideoCard key={video._id} video={video} />
                ))
            ) : (
                <div className="text-center text-lg text-gray-500">No Related Videos Exists for now..</div>
            )}
        </div>
    )
}

export default RelatedVideos