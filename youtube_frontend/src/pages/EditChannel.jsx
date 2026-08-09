import React, { useEffect, useState } from "react";
import { editChannel, getMyChannel } from "../api/channel";
import { useNavigate } from "react-router-dom";

const EditChannel = () => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [hasChannel, setHasChannel] = useState(true);

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    banner: null,
  });

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);

        const data = await getMyChannel();

        setChannel(data);

        setFormData({
          channelName: data?.channelName || "",
          description: data?.description || "",
          banner: null,
        });

        setPreview(data?.banner || "");
      } catch (error) {
        console.log(error);

        if (error.response?.status === 404) {
          setHasChannel(false);
        }

        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "banner") {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = new FormData();

      data.append("channelName", formData.channelName);

      data.append("description", formData.description);

      if (formData.banner) {
        data.append("banner", formData.banner);
      }

      await editChannel(data);

      navigate("/profile");
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to update channel");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading channel...</h1>
      </div>
    );
  }

  if (!hasChannel) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">No channel found</h1>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}

        <h1 className="text-3xl font-bold">Edit Channel</h1>

        <p className="text-gray-500 mt-2 mb-8">
          Update your channel information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Banner */}

          <div>
            <label className="block font-medium mb-2">Banner</label>

            <div className="w-full h-52 rounded-xl overflow-hidden bg-gray-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Channel Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Banner Preview
                </div>
              )}
            </div>

            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              className="mt-3"
            />
          </div>

          {/* Avatar */}

          <div>
            <label className="block font-medium mb-2">Avatar</label>

            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-300 border border-gray-400">
              {channel?.owner?.avatar ? (
                <img
                  src={channel.owner.avatar}
                  alt={channel.owner.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center w-full h-full bg-red-600 text-white text-3xl font-bold">
                  {channel?.owner?.username?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Avatar editing is not available yet.
            </p>
          </div>

          {/* Channel Name */}

          <div>
            <label htmlFor="channelName" className="block font-medium mb-2">
              Channel Name
            </label>

            <input
              id="channelName"
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              placeholder="Enter channel name"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Description */}

          <div>
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Tell viewers about your channel..."
              className="w-full border border-gray-300 rounded-xl p-3 outline-none resize-none focus:border-red-500"
            />
          </div>

          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Buttons */}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChannel;
