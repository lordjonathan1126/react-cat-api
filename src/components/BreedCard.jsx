import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

function BreedCard({ breed, openModal }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (breed && breed.id) {
      setLoading(true);
      ApiService.getBreedImage(breed.id)
        .then((response) => {
          if (response.data.length > 0) {
            setImageUrl(response.data[0].url);
            setError(null);
          } else {
            setError("No image available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching breed image:", error);
          setError("Failed to load image.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [breed]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    };
    openModal(breed, position);
  };

  return (
    <div
      className="breed-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${breed.name}`}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick(e);
      }}
    >
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="image-placeholder">{error}</div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={breed.name}
          className="breed-image"
          loading="lazy"
        />
      ) : (
        <div className="image-placeholder">No Image</div>
      )}
      <div className="breed-info">
        <h3>{breed.name}</h3>
        <p>{breed.temperament}</p>
      </div>
    </div>
  );
}

BreedCard.propTypes = {
  breed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BreedCard;
