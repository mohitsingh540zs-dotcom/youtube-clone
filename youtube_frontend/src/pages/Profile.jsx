import { useEffect, useState } from "react";
import { getMyChannel } from "../api/channel";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteVideo, getMyVideos } from "../api/video";


const Profile = () => {
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasChannel, setHasChannel] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    try {
      const channelData = await getMyChannel();
      setChannel(channelData);

      const myVideos = await getMyVideos();
      setVideos(myVideos);
    } catch (error) {
      if (error.response?.status === 404) {
        setHasChannel(false);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVideo(id);
      fetchData();

    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!hasChannel) {
    return (
      <div>
        <div className="w-full max-w-7xl mx-auto flex items-center gap-4">

          <div className="w-32 h-32 rounded-full overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-red-600 text-white flex items-center justify-center text-4xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <p className="text-xl">{user?.email}</p>
            <p className="text-lg">{user?.username}</p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4">

          <div className="max-w-lg text-center">
            <div className="w-28 h-28 rounded-full bg-red-100 mx-auto flex items-center justify-center">
              <span className="text-5xl">📺</span>
            </div>

            <h1 className="text-3xl font-bold mt-8">
              Create your Channel
            </h1>

            <p className="text-gray-500 mt-4">
              Create a channel to upload videos, gain subscribers,
              and build your audience.
            </p>
            <Link
              to="/create-channel"
              className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              Create Channel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-6">

      {/* Banner */}
      <div className="w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-gray-300">
        {channel?.banner ? (
          <img
            src={channel.banner}
            alt={channel.channelName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-red-600 to-red-400" />
        )}
      </div>

      {/* Profile */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-6 -mt-16 md:-mt-20 px-4">

        {/* Avatar */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white bg-gray-200 shadow-lg">
          {channel?.owner?.avatar ? (
            <img
              src={channel?.owner.avatar}
              alt={channel?.owner.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-red-600 text-white text-5xl font-bold">
              {channel?.owner?.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
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

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/upload"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
          >
            Upload Video
          </Link>

          <Link
            to="/edit-channel"
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-full"
          >
            Edit Channel
          </Link>
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

      {/* Empty State */}
      {videos.length === 0 ? (

        <div className="py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No videos uploaded
          </h2>

          <p className="text-gray-500 mt-3">
            Upload your first video and start growing your audience.
          </p>

          <Link
            to="/upload"
            className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
          >
            Upload Video
          </Link>

        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {videos.map((video) => (

            <div
              key={video._id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >

              <div className="relative">

                <img
                  src={video.thumbnail}
                  className="aspect-video w-full object-cover"
                />

                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(video.duration / 60)}:
                  {(video.duration % 60).toString().padStart(2, "0")}
                </span>

              </div>

              <div className="p-4">

                <h2 className="font-semibold line-clamp-2">
                  {video.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {video.views} views
                </p>

                <div className="flex gap-2 mt-4">

                  <button className="flex-1 bg-gray-200 py-2 rounded-lg">
                    Edit
                  </button>

                  <button onClick={() => { handleDelete(video._id) }} className="flex-1 bg-red-600 text-white py-2 rounded-lg">
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}


    </div>
  );
};

export default Profile;