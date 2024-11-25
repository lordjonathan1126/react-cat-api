import React, { useState, Suspense, lazy } from "react";
import Home from "./components/Home";
import Spinner from "./components/Spinner";
import "./App.css";

const DetailsModal = lazy(() => import("./components/DetailsModal"));

function App() {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const openModal = (breed, position) => {
    setSelectedBreed(breed);
    setModalPosition(position);
  };

  const closeModal = () => {
    setSelectedBreed(null);
    setModalPosition({ x: 0, y: 0 });
  };

  return (
    <div className="app-container">
      <Home openModal={openModal} />
      {selectedBreed && (
        <Suspense fallback={<Spinner />}>
          <DetailsModal
            breed={selectedBreed}
            isOpen={!!selectedBreed}
            onRequestClose={closeModal}
            position={modalPosition}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
