// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../util/API.js";
import "../Home/Home.css";
import videoIconRight from "../../assets/iconsRight.svg";
import videoIconLeft from "../../assets/iconsLeft.svg";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getMovies = async () => {
    const movieData = await fetchTrendingMovies();
    setMovies(movieData);
  };

  const displayedMovies = movies.slice(currentIndex, currentIndex + 4);

  console.log(currentIndex);

  useEffect(() => {
    getMovies();
  }, []);

  const handleNext = () => {
    if (currentIndex + 4 < movies.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
          <div className="movies-container">
            <button className="scroll-button prev" onClick={handlePrev}>
              <img src={videoIconLeft} alt="cinema-" />
            </button>
            <ul className="movies-list">
              {displayedMovies.map((movie) => (
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
            <button className="scroll-button next" onClick={handleNext}>
              <img src={videoIconRight} alt="cinema-" />
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
