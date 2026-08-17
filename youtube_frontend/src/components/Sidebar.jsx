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
  GraduationCap,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    section: "Main",
    items: [
      {
        title: "Home",
        icon: Home,
        path: "/",
      },
      {
        title: "Trending",
        icon: Flame,
        path: "/trending",
      },
      {
        title: "Subscriptions",
        icon: TvMinimalPlay,
        path: "/subscriptions",
      },
    ],
  },

  {
    section: "Library",
    items: [
      {
        title: "History",
        icon: History,
        path: "/history",
      },
      {
        title: "Watch Later",
        icon: Clock3,
        path: "/watch-later",
      },
      {
        title: "Liked Videos",
        icon: ThumbsUp,
        path: "/liked",
      },
    ],
  },

  {
    section: "Explore",
    items: [
      {
        title: "Gaming",
        icon: Gamepad2,
        path: "/gaming",
      },
      {
        title: "Music",
        icon: Music2,
        path: "/music",
      },
      {
        title: "Education",
        icon: GraduationCap,
        path: "/education",
      },
    ],
  },

  {
    section: "You",
    items: [
      {
        title: "My Channel",
        icon: UserCircle,
        path: "/profile",
      },
    ],
  },
];
const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`
                hidden md:block
                sticky top-16
                h-[calc(100vh-64px)]
                overflow-y-auto
                bg-white
                border-r
                transition-all
                duration-300
                ${isOpen ? "w-64" : "w-20"}
            `}
    >
      <div className="py-4">
        {menu.map((group) => (
          <div key={group.section} className="mb-6">
            {isOpen && (
              <p className="px-5 mb-2 text-xs uppercase text-gray-500 font-semibold">
                {group.section}
              </p>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                                        flex
                                        items-center
                                        gap-4
                                        mx-2
                                        mb-1
                                        rounded-xl
                                        px-4
                                        py-3
                                        transition

                                        ${
                                          isActive
                                            ? "bg-gray-200 font-semibold"
                                            : "hover:bg-gray-100"
                                        }
                                    `
                  }
                >
                  <Icon size={22} />

                  {isOpen && <span>{item.title}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
