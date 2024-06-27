// Search.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css'; // Add CSS specific to Search component

const Search = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
};

export default Search;
