import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Watch from "../pages/Watch.jsx";
import Channel from "../pages/Channel.jsx";
import UploadVideo from "../pages/UploadVideo.jsx";
import EditChannel from "../pages/EditChannel.jsx";
import Profile from "../pages/Profile.jsx";
import Search from "../pages/Search.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"
import CreateChannel from "../pages/CreateChannel.jsx";

const AppRoutes = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },

    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/watch/:id",
                element: <Watch />,
            },
            {
                path: "/channel/:id",
                element: <Channel />,
            },

            // Protected Routes
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/create-channel",
                element: (
                    <ProtectedRoute>
                        <CreateChannel />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/upload",
                element: (
                    <ProtectedRoute>
                        <UploadVideo />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/edit-channel",
                element: (
                    <ProtectedRoute>
                        <EditChannel />
                    </ProtectedRoute>
                ),
            },

            // Public
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default AppRoutes;

