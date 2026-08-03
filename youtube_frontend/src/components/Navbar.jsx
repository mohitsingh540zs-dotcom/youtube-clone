import { Bell, Menu, Plus, Search, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { logout } from "../api/auth";

const Navbar = ({ setIsSidebarOpen, setIsMobileOpen }) => {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();

            setUser(null);

            setClicked(false);

            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="sticky top-0 z-50 h-16 bg-white border-b px-4 md:px-6 flex items-center justify-between gap-4">

            {/* Left */}
            <div className="flex items-center gap-4 flex-shrink-0">

                <button
                    onClick={() => {
                        if (window.innerWidth < 768) {
                            setIsMobileOpen(true);
                        } else {
                            setIsSidebarOpen(prev => !prev);
                        }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <Menu />
                </button>

                <Link to="/" className="flex items-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        YouTube
                    </h1>
                </Link>

            </div>

            {/* Center */}
            <div className="hidden md:flex flex-1 justify-center max-w-2xl">
                <SearchBar />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">

                {/* Mobile Search */}
                <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition">
                    <Search size={22} />
                </button>

                {/* Create Button */}
                <button className="hidden sm:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-full">

                    <Plus size={20} />

                    <span className="font-medium">
                        Create
                    </span>

                </button>

                {/* Notification */}
                {user && (
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <Bell size={22} />
                    </button>
                )}

                {/* Profile */}
                {user ? (
                    <div
                        to="/profile"
                        onClick={() => setClicked(!clicked)}
                        className="flex items-center cursor-pointer relative"
                    >
                        {user.profilePic ? (
                            <img
                                src={user.profilePic}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <UserCircle
                                size={34}
                                className="text-gray-700"
                            />
                        )}

                        {clicked && (

                            <div onClick={(e) => e.stopPropagation()} className="absolute top-10 right-0  w-30 bg-gray-100 shadow-2xs rounded-xl p-2">
                                <button onClick={handleLogout} className=" w-full py-2 hover:bg-gray-300 rounded-full cursor-pointer">logout</button>

                                <button className=" w-full py-2 hover:bg-gray-300 rounded-full cursor-pointer">profile</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition flex items-center gap-2 px-4 py-2"
                    >
                        <UserCircle size={22} />
                        <span className="hidden sm:block">Sign In</span>
                    </Link>
                )}

            </div>

        </header>
    );
};

export default Navbar;