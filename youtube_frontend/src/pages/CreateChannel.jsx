import { useState } from "react";
import { createChannel } from "../api/channel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateChannel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        channelName: "",
        description: "",
        banner: null,
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
                banner: file,
            }));

            setPreview(URL.createObjectURL(file));
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

            data.append("channelName", formData.channelName);
            data.append("description", formData.description);

            if (formData.banner) {
                data.append("banner", formData.banner);
            }

            await createChannel(data);

            navigate("/profile", { replace: true });

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to create channel."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Create your Channel
                </h1>

                <p className="text-gray-500 mb-8">
                    Personalize your YouTube channel.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Banner */}
                    <div>
                        <label className="block font-medium mb-2">
                            Banner
                        </label>

                        <div className="w-full h-52 rounded-xl bg-gray-200 overflow-hidden">

                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Banner Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
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

                    {/* User Avatar */}
                    <div className="flex items-center gap-6">

                        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-300">

                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    Avatar
                                </div>
                            )}

                        </div>

                        <div>
                            <h2 className="font-semibold">
                                {user?.username}
                            </h2>

                            <p className="text-sm text-gray-500">
                                Your profile picture will be used as your channel avatar.
                            </p>
                        </div>

                    </div>

                    {/* Channel Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Channel Name
                        </label>

                        <input
                            type="text"
                            name="channelName"
                            value={formData.channelName}
                            onChange={handleChange}
                            placeholder="Enter channel name"
                            className="w-full border rounded-xl p-3 outline-none focus:border-red-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell viewers about your channel..."
                            className="w-full border rounded-xl p-3 outline-none resize-none focus:border-red-500"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Channel"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default CreateChannel;