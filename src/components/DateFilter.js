function DateFilter({ setDateFilter }) {
  const handleChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setDateFilter(date);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Filter by date
      </label>
      <input
        type="date"
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 rounded-xl dark:bg-gray-700 dark:border-gray-600 
          focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 
          ease-in-out text-gray-700 dark:text-gray-300"
      />
    </div>
  );
}

export default DateFilter;

