import { Dot, Download, Share, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'

const VideoInfo = () => {
    return (
        <div className='flex flex-col gap-2 '>
            <h1 className='font-bold text-2xl leading-snug'>Title</h1>

            <div className='flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4'>
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-2'>
                        <div className='w-12 h-12 rounded-full bg-black'></div>

                        <div className='flex flex-col'>
                            <h2>Channel Name</h2>
                            <p>Total Subscribers</p>
                        </div>
                    </div>
                    <button className='bg-black px-6 py-2 text-white rounded-full font-medium hover:bg-gray-800 transition cursor-pointer'>Subscribe</button>
                </div>

                <div className='flex gap-4 items-center flex-wrap'>
                    <div className='bg-gray-300 flex items-center rounded-full'>

                        <button className='px-3 py-2 flex items-center gap-2 hover:bg-gray-200 transition rounded-l-full'>
                            <ThumbsUp /> 30likes
                        </button>

                        <div className="w-[2px] h-6 bg-gray-400"></div>
                        <button className='px-3 py-2 hover:bg-gray-200 transition rounded-r-full'>
                            <ThumbsDown />
                        </button>

                    </div>

                    <button className='px-3 py-2 bg-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-200 transition'>
                        <Share2 />  Share
                    </button>

                    <button className='px-3 py-2 bg-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-200 transition'>
                        <Download />  Download
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoInfo