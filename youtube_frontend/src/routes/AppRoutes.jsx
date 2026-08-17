import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout.jsx";
const Register = lazy(() => import("../pages/Register.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
import MainLayout from "../layouts/MainLayout.jsx";
const Home = lazy(() => import("../pages/Home.jsx"));
const Watch = lazy(() => import("../pages/Watch.jsx"));
const Channel = lazy(() => import("../pages/Channel.jsx"));
const UploadVideo = lazy(() => import("../pages/UploadVideo.jsx"));
const EditChannel = lazy(() => import("../pages/EditChannel.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Search = lazy(() => import("../pages/Search.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));
const CreateChannel = lazy(() => import("../pages/CreateChannel.jsx"));
import ProtectedRoute from "./ProtectedRoute.jsx";

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
