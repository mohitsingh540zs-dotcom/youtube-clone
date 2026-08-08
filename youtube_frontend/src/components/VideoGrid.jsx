import React from 'react'
import VideoCard from './VideoCard'

const VideoGrid = ({ videos }) => {
    return (
        <div className='w-full min-h-screen'>
            {videos.length > 0 ? (

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2'>
                    {videos.map(video => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            )
                : (
                    <div className='text-center text-lg font-bold'>No Videos Found</div>
                )
            }
        </div>
    )
}

export default VideoGrid