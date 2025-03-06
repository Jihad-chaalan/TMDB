// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../util/API.js";
import "../Home/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchTrendingMovies();
      setMovies(movieData);
    };
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
      <h1>Trending Movies</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
