import React from 'react'

const VideoCard = () => {
    return (
        <div className='border border-white p-2 rounded-lg'>

            <div className='w-full aspect-video overflow-hidden'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiVAaZpXFUxG-SsGTbFP-TazT_8E1fYPzB3eveycuqA&s=10" alt="" className='w-full h-full object-fill ' />
            </div>


            <div className='flex gap-3 mt-2 items-center'>
                <div className='w-10 h-10 rounded-full'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiVAaZpXFUxG-SsGTbFP-TazT_8E1fYPzB3eveycuqA&s=10" alt="" className='w-full h-full  object-fill rounded-full' />
                </div>

                <div className='flex justify-start gap-2 flex-col'>
                    <h2>Title</h2>
                    <div className='flex gap-4 justify-start'>
                        <p>Channel Name</p>
                        <p>Views</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VideoCard