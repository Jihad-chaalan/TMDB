// src/util/API.js

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

const API_BASE = "https://api.themoviedb.org/3";

// const url = 'https://api.themoviedb.org/3/person/125?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzhhYWRkNWJjODA0NjljYTUzZDdkYWFmMTNjZmRiZCIsIm5iZiI6MTczOTY5MzQyMi4zNCwic3ViIjoiNjdiMTlkNmU4NWY1NzZlOTdkNmRiMmMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i5b5QkCeIMIgt2zcjcl4qBDem118NypBZ7yEeSal-ss'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

export const fetchActorDetails = (ActorId) => {
  if (!ActorId) {
    console.error("fetchActorDetails: No Actor ID provided.");
    return null;
  }
  const url = ` https://api.themoviedb.org/3/person/${ActorId}?language=en-US`;
  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error(err));
  return fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Actor data:", data);
      return data;
    })
    .catch((err) => {
      console.error("Error fetching actor details:", err);
      return null;
    });
};

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

export const searchMulti = async (query) => {
  if (!query) return [];

  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.results.slice(0, 5); // return top 5 suggestions
  } catch (error) {
    console.error("Error searching TMDB:", error);
    return [];
  }
};

export const fetchPopularMovies = () => {
  return fetch(`${API_BASE}/movie/popular?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => data.results || [])
    .catch((err) => {
      console.error("Error fetching popular movies:", err);
      return [];
    });
};

// You can similarly create these:
export const fetchNowPlaying = () => {
  return fetch(`${API_BASE}/movie/now_playing?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => data.results || [])
    .catch((err) => {
      console.error("Error fetching now playing movies:", err);
      return [];
    });
};

export const fetchTopRated = () => {
  return fetch(`${API_BASE}/movie/top_rated?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => data.results || [])
    .catch((err) => {
      console.error("Error fetching top rated movies:", err);
      return [];
    });
};

export const fetchUpcoming = () => {
  return fetch(`${API_BASE}/movie/upcoming?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => data.results || [])
    .catch((err) => {
      console.error("Error fetching upcoming movies:", err);
      return [];
    });
};
