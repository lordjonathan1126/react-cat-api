import React, { useState } from "react";
import ApiService from "../services/ApiService";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

function SearchBar({ setSearchResults, setSearchHistory }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (query.trim() === "") return;

    setLoading(true);
    ApiService.searchBreeds(query)
      .then((response) => {
        setSearchResults(response.data);
        setSearchHistory((prevHistory) => [query, ...prevHistory]);
        setError(null);
      })
      .catch((error) => {
        console.error("Error searching breeds:", error);
        setError("Failed to search breeds. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClear = () => {
    setQuery("");
    setSearchResults([]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for cat breeds..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Search for cat breeds"
      />
      <button onClick={handleSearch} aria-label="Search">
        Search
      </button>
      <button onClick={handleClear} aria-label="Clear search results">
        Clear
      </button>

      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

SearchBar.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
  setSearchHistory: PropTypes.func.isRequired,
};

export default SearchBar;
