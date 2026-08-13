import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/search?title=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full h-10 flex border border-gray-300 rounded-full overflow-hidden"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search videos..."
        aria-label="Search videos"
        className="flex-1 min-w-0 px-5 outline-none"
      />

      <button
        type="submit"
        className="w-16 flex-shrink-0 border-l border-gray-300 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
