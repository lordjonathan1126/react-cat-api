import axios from "axios";

const API_KEY = "Your API Key here"; // Replace with your actual API key
const BASE_URL = "https://api.thecatapi.com/v1";

const ApiService = {
  getAllBreeds: () => {
    return axios.get(`${BASE_URL}/breeds`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
  },

  searchBreeds: (query) => {
    return axios.get(`${BASE_URL}/breeds/search`, {
      params: { q: query },
      headers: {
        "x-api-key": API_KEY,
      },
    });
  },

  getBreedImage: (breedId) => {
    return axios.get(`${BASE_URL}/images/search`, {
      params: { breed_ids: breedId },
      headers: {
        "x-api-key": API_KEY,
      },
    });
  },
};

export default ApiService;
