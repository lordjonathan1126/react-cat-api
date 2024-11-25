import React from "react";
import "../App.css";
import PropTypes from "prop-types";

function Spinner() {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

Spinner.propTypes = {};

export default Spinner;
