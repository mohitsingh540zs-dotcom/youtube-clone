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

const AppRoutes = createBrowserRouter([

    {
        element: <AuthLayout />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },

    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/watch/:id',
                element: <Watch />
            },
            {
                path: '/channel/:id',
                element: <Channel />
            },
            {
                path: '/upload',
                element: <UploadVideo />
            },
            {
                path: '/edit-channel',
                element: <EditChannel />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/search',
                element: <Search />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);


export default AppRoutes;