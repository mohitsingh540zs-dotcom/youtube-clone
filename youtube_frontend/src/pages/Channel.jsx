import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVideosByChannel } from '../api/channel';
import VideoGrid from "../components/VideoGrid"

const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVideosByChannel(id);

        setChannel(data.channel);
        setVideos(data.videos);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [id]);

  console.log(channel)
  console.log(videos)
  return (
    <div className='max-w-7xl mx-auto'>

      {/* banner */}
      <div className='w-full h-52 md:h-64 bg-gray-300 rounded-xl'>
        <img src={channel?.banner} alt="" className='w-full h-full object-cover' />
      </div>

      {/* profile */}
      <div className='flex flex-col lg:flex-row lg:items-end gap-6 -mt-16 md:-mt-20 px-4'>

        {/* avatar */}
        <div className='w-36 h-36 md:w-44 md:h-44 bg-black rounded-full '>
          <img src={channel?.owner?.avatar} alt={channel?.owner?.username} className='w-full h-full object-cover rounded-full' />
        </div>

        {/* info */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold lg:mt-20">
            {channel?.channelName}
          </h1>

          <div className="flex flex-wrap gap-3 mt-2 text-gray-600 text-sm">
            <span>@{channel?.owner.username}</span>

            <span>•</span>

            <span>
              {channel?.subscribers?.length || 0} subscribers
            </span>
          </div>

          <p className="mt-4 text-gray-700">
            {channel?.description || "No description added yet."}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Joined{" "}
            {new Date(channel?.createdAt).toLocaleDateString()}
          </p>

        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-full"
          >
            Subscribe
          </button>
        </div>

      </div>
      {/* Tabs */}
      <div className="mt-10 border-b">
        <div className="flex gap-8 font-medium">
          <button className="border-b-2 border-black pb-3">
            Videos
          </button>

          <button className="pb-3 text-gray-500 hover:text-black">
            About
          </button>
        </div>
      </div>

      {videos.length === 0 ? (
        <div>
          No videos Available
        </div>
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  )
}

export default Channel