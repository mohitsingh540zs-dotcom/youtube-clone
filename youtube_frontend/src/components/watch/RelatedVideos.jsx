import useVideos from "../../hooks/useVideos"
import RelatedVideoCard from "./RelatedVideoCard"

const RelatedVideos = ({ videoId }) => {
    const { videos, loading } = useVideos();

    const relatedVideos = videos.filter(video => video._id !== videoId);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="w-full flex flex-col gap-4 p-2">
            {relatedVideos.map((video) => (
                <RelatedVideoCard key={video._id} video={video} />
            ))}
        </div>
    )
}

export default RelatedVideos