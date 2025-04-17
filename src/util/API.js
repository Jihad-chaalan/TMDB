// src/util/API.js

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

// export const fetchPopularActor = async () => {
//   const url =
//     "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return [];
//   }
// };
export const fetchPopularActor = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Return the entire data object including total_pages
    return data;
  } catch (error) {
    console.error("Error fetching actors:", error);
    return { results: [], total_pages: 0 };
  }
};

// Function to fetch trending movies
export const fetchTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
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

export const fetchMovieDetails = async (movieId) => {
  if (!movieId) {
    console.error("fetchMovieDetails: No movie ID provided.");
    return null;
  }

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  try {
    const [movieResponse, videoResponse] = await Promise.all([
      fetch(movieUrl, options),
      fetch(videoUrl, options),
    ]);

    if (!movieResponse.ok || !videoResponse.ok) {
      throw new Error(`HTTP Error! Status: ${movieResponse.status}`);
    }

    const movieData = await movieResponse.json();
    const videoData = await videoResponse.json();
    const trailer = videoData.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return {
      ...movieData,
      trailerUrl: trailer
        ? `https://www.youtube.com/embed/${trailer.key}`
        : null,
    };
  } catch (error) {
    console.error("Error fetching movie details and trailer:", error);
    return null;
  }
};
