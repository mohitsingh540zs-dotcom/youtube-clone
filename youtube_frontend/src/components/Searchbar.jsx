import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="hidden md:flex items-center w-full max-w-xl h-11 border border-gray-300 rounded-full overflow-hidden">

            <input
                type="text"
                placeholder="Search videos..."
                aria-label="Search videos"
                className="flex-1 h-full px-5 outline-none"
            />

            <button
                className="w-16 h-full border-l border-gray-300 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
                <Search size={20} />
            </button>

        </div>
    );
};

export default SearchBar;