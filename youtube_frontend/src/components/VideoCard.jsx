import { Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ video }) => {

    return (
        <Link to={`/watch/${video._id}`} className='block p-2 rounded-xl hover:bg-gray-300'>

            <div className='w-full aspect-video overflow-hidden'>
                <img src={video.thumbnail} alt={video.title} className='w-full h-full object-fill rounded-xl' />
            </div>


            <div className='flex gap-3 mt-2 items-center'>
                <div className='w-10 h-10 rounded-full'>
                    <img src={video.channel.banner ? video.channel.banner : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiVAaZpXFUxG-SsGTbFP-TazT_8E1fYPzB3eveycuqA&s=10"} alt="" className='w-full h-full  object-fill rounded-full' />
                </div>

                <div className='flex justify-start gap-2 flex-col'>
                    <h2>{video.title}</h2>
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