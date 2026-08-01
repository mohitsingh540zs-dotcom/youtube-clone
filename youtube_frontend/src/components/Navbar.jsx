import { Bell, Menu, Plus, Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({ setIsSidebarOpen, setIsMobileOpen }) => {
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
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <Bell size={22} />
                </button>

                {/* Profile */}
                <button className="rounded-full hover:bg-gray-100 transition p-1">
                    <UserCircle size={34} />
                </button>

            </div>

        </header>
    );
};

export default Navbar;