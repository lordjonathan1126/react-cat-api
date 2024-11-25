import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import SearchBar from "./SearchBar";
import BreedCard from "./BreedCard";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

function Home({ openModal }) {
  const [breeds, setBreeds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all breeds on mount to select random breeds
  useEffect(() => {
    setLoading(true);
    ApiService.getAllBreeds()
      .then((response) => {
        // Shuffle and select 10 random breeds
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setBreeds(shuffled.slice(0, 10));
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching breeds:", error);
        setError("Failed to load breeds. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteHistoryItem = (index) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((_, i) => i !== index)
    );
  };

  const clearAllHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="home-container">
      <SearchBar
        setSearchResults={setSearchResults}
        setSearchHistory={setSearchHistory}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {searchResults.length > 0 ? (
            <div className="section">
              <h2>Search Results</h2>
              {searchResults.map((breed) => (
                <BreedCard key={breed.id} breed={breed} openModal={openModal} />
              ))}
            </div>
          ) : (
            // Display message when no search results are found
            <div className="section">
              <h2>Search Results</h2>
              <p className="no-results-message">No results available.</p>
            </div>
          )}

          {searchHistory.length > 0 && (
            <div className="section">
              <div className="history-header">
                <h2>Search History</h2>
                <button
                  onClick={clearAllHistory}
                  className="clear-all-button"
                  aria-label="Clear all search history"
                >
                  Clear All
                </button>
              </div>
              <ul className="history-list">
                {searchHistory.map((term, index) => (
                  <li key={index} className="history-item">
                    <span className="search-term">{term}</span>
                    <button
                      onClick={() => deleteHistoryItem(index)}
                      className="delete-button"
                      aria-label={`Delete search term ${term}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="section">
            <h2>Random Breeds</h2>
            {breeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} openModal={openModal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Home.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Home;
