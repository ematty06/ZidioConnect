import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search internships..."
        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;