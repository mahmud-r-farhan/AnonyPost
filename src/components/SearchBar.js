import { Search, X } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
          group-hover:text-primary transition-colors" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-10 py-2.5 border-2 rounded-xl dark:bg-gray-700 
            dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary 
            transition-all duration-200 ease-in-out placeholder:text-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
              hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

