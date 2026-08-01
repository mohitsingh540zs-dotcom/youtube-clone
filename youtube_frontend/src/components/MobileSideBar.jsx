import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
    Home,
    TvMinimalPlay,
    History,
    Clock3,
    ThumbsUp,
    UserCircle,
    Flame,
    Music2,
    Gamepad2,
    GraduationCap
} from "lucide-react";

const menu = [
    {
        section: "Main",
        items: [
            { title: "Home", icon: Home, path: "/" },
            { title: "Trending", icon: Flame, path: "/trending" },
            { title: "Subscriptions", icon: TvMinimalPlay, path: "/subscriptions" }
        ]
    },
    {
        section: "Library",
        items: [
            { title: "History", icon: History, path: "/history" },
            { title: "Watch Later", icon: Clock3, path: "/watch-later" },
            { title: "Liked Videos", icon: ThumbsUp, path: "/liked" }
        ]
    },
    {
        section: "Explore",
        items: [
            { title: "Gaming", icon: Gamepad2, path: "/gaming" },
            { title: "Music", icon: Music2, path: "/music" },
            { title: "Education", icon: GraduationCap, path: "/education" }
        ]
    },
    {
        section: "You",
        items: [
            { title: "My Channel", icon: UserCircle, path: "/channel" }
        ]
    }
];

const MobileSidebar = ({ open, setOpen }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
            />

            {/* Drawer */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen w-72 bg-white z-50
                    transform transition-transform duration-300
                    md:hidden
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="h-16 border-b flex items-center justify-between px-4">
                    <h2 className="text-xl font-bold text-red-600">
                        YouTube
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <X />
                    </button>
                </div>

                {/* Menu */}
                <div className="overflow-y-auto h-[calc(100vh-64px)] py-4">

                    {menu.map(group => (
                        <div key={group.section} className="mb-5">

                            <p className="px-5 mb-2 text-xs uppercase text-gray-400 font-semibold">
                                {group.section}
                            </p>

                            {group.items.map(item => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.title}
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            `
                                            flex items-center gap-4
                                            mx-2 mb-1
                                            px-4 py-3
                                            rounded-xl
                                            transition
                                            ${isActive
                                                ? "bg-gray-200 font-semibold"
                                                : "hover:bg-gray-100"
                                            }
                                            `
                                        }
                                    >
                                        <Icon size={22} />
                                        <span>{item.title}</span>
                                    </NavLink>
                                );
                            })}

                        </div>
                    ))}

                </div>
            </aside>
        </>
    );
};

export default MobileSidebar;