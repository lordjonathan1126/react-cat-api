import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ApiService from "../services/ApiService";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

function DetailsModal({ breed, isOpen, onRequestClose, position }) {
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

  const customStyles = {
    content: {
      top: `${position.y}px`,
      left: `${position.x}px`,
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(0, 0)",
      maxWidth: "400px",
      width: "90%",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
  };

  if (!breed) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Breed Details"
      style={customStyles}
      aria={{
        labelledby: "heading",
        describedby: "description",
      }}
    >
      <button
        className="close-button"
        onClick={onRequestClose}
        aria-label="Close modal"
      >
        &times;
      </button>
      <div className="modal-content">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="image-placeholder">{error}</div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={breed.name}
            className="modal-image"
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
        <h2 id="heading">{breed.name}</h2>
        <p id="description">{breed.description}</p>
        <p>
          <strong>Origin:</strong> {breed.origin}
        </p>
        <p>
          <strong>Temperament:</strong> {breed.temperament}
        </p>
        <p>
          <strong>Life Span:</strong> {breed.life_span} years
        </p>
        {breed.wikipedia_url && (
          <p>
            <a
              href={breed.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more on Wikipedia
            </a>
          </p>
        )}
        {/* Add more details as needed */}
      </div>
    </Modal>
  );
}

DetailsModal.propTypes = {
  breed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    origin: PropTypes.string,
    temperament: PropTypes.string,
    life_span: PropTypes.string,
    wikipedia_url: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailsModal;
