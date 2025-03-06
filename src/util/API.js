// src/util/API.js
const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

// Function to fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results; // Return only the movies array
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
