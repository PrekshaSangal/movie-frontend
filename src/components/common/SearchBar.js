// src/components/common/SearchBar.js

import React from "react";
// It's good practice to use an icon library for UI elements.
// You would need to install react-icons: `npm install react-icons`
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you might trigger a re-fetch here if search was backend-based.
    // For our front-end filter, this just prevents the page from reloading.
    console.log("Searching for:", searchTerm);
  };

  return (
    // Using a form for better accessibility and semantics.
    <form onSubmit={handleSearch} className="relative w-full" role="search">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-slate-400 h-5 w-5" aria-hidden="true" />
      </div>
      <input
        className="w-full h-14 pl-12 pr-4 py-2 text-lg bg-white border-2 border-slate-300
                   rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-300 placeholder-slate-400"
        type="search" // 'search' type often provides a clear 'x' button in browsers.
        placeholder="Search for movies by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search for movies"
      />
    </form>
  );
};

export default SearchBar;