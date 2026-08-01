import React from 'react'
import VideoCard from './VideoCard'

const VideoGrid = () => {
    return (
        <div className='w-full min-h-screen bg-black text-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
            </div>
        </div>
    )
}

export default VideoGrid