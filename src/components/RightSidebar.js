import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import SearchBar from './SearchBar';
import DateFilter from './DateFilter';

function RightSidebar({ searchTerm, setSearchTerm, dateFilter, setDateFilter }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`fixed right-0 top-8 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-l 
        dark:border-gray-700 shadow-lg ${isCollapsed ? 'w-1' : 'w-64'}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -left-6 top-4 bg-white dark:bg-gray-800 border border-gray-200 
          dark:border-gray-700 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700
          transition-colors duration-300 ease-in-out`}
      >
        {isCollapsed ? <Search size={25} /> : <ChevronRight size={25} />}
      </button>

      {!isCollapsed && (
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DateFilter setDateFilter={setDateFilter} />
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
