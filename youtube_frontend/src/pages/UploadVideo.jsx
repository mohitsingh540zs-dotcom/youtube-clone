import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../api/video";
import { categories } from "../utils/data";

const UploadVideo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    thumbnail: null,
    videoUrl: null,
    duration: 0,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "thumbnail") {
        setPreview(URL.createObjectURL(file));
      }

      if (name === "video") {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);

          setFormData((prev) => ({
            ...prev,
            duration: Math.round(video.duration), // duration in seconds
          }));
        };

        video.src = URL.createObjectURL(file);
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
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("thumbnail", formData.thumbnail);
      data.append("video", formData.video);
      data.append("duration", formData.duration);

      await uploadVideo(data);

      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Video upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>

        <p className="text-gray-500 mb-8">Share your content with the world.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail */}

          <div>
            <label className="block font-medium mb-2">Thumbnail</label>

            <div className="w-full h-60 rounded-xl overflow-hidden bg-gray-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Thumbnail Preview
                </div>
              )}
            </div>

            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className="mt-3 border px-4 py-1 rounded-lg cursor-pointer"
              required
            />
          </div>

          {/* Video */}

          <div>
            <label className="block font-medium mb-2">Video</label>

            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3 cursor-pointer"
            />

            {formData.video && (
              <p className="mt-2 text-sm text-gray-600">
                {formData.video.name}
              </p>
            )}
          </div>

          {/* Title */}

          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="w-full border rounded-xl p-3 outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your video..."
              className="w-full border rounded-xl p-3 resize-none outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Category */}

          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:border-red-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
