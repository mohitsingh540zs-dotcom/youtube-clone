import { Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ video }) => {
    console.log(video)
    return (
        <Link to={`/watch/${video._id}`} className='block p-4 rounded-xl hover:bg-gray-300'>

            <div className='w-full aspect-video overflow-hidden'>
                <img src={video.thumbnail} alt={video.title} className='w-full h-full object-fill rounded-xl' />
            </div>

            <div className='flex gap-3 mt-2 items-center'>
                <div className='w-10 h-10 rounded-full'>
                    {
                        video?.owner?.avatar ? (
                            <img src={video?.owner?.avatar} alt={video?.owner?.username} className='w-full h-full  object-cover rounded-full' />
                        ) : (
                            <div className='w-10 h-10 rounded-full text-xl text-white bg-red-400 flex justify-center items-center font-bold'>
                                {video?.owner?.username.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                </div>

                <div className='flex justify-start gap-2 flex-col'>
                    <h2 className='text-xl'>{video.title}</h2>
                    <div className='flex gap-4 justify-start'>
                        <p>{video.channel.channelName}</p>
                        <p className='flex items-center gap-1'> <Eye size={16} /> {video.views}</p>
                        <p>posted days</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard