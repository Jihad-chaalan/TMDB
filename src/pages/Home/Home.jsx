// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../util/API.js";
import "../Home/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const movieData = await fetchTrendingMovies();
    setMovies(movieData);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="Home-container">
      <div className="Welcome-section">
        <p
          style={{ fontWeight: "bold", fontSize: "2.5rem", lineHeight: "1.2" }}
        >
          Welcome to DB Movies.
        </p>
        <p
          style={{ fontStyle: "italic", fontSize: "1.2rem", lineHeight: "1.6" }}
        >
          Millions of movies, TV shows and people to discover.
        </p>
      </div>
      <div className="Trending-movies">
        <h1 className="TM-header">Trending Movies</h1>
        {movies.length > 0 ? (
          <ul className="movies-list">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "200px", borderRadius: "10px" }}
                />
                <p className="movie-title">{movie.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
