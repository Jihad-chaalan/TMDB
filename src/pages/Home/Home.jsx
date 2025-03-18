import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../util/API.js";
import "../Home/Home.css";
import videoIconRight from "../../assets/iconsRight.svg";
import videoIconLeft from "../../assets/iconsLeft.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(4); // Default 4
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to movie details page
  };

  const getMovies = async () => {
    const movieData = await fetchTrendingMovies();
    setMovies(movieData);
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Function to update moviesPerPage based on screen width
  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth <= 600) {
        setMoviesPerPage(1); // Mobile
      } else if (window.innerWidth <= 820) {
        setMoviesPerPage(2); // Tablets
      } else if (window.innerWidth <= 1024) {
        setMoviesPerPage(3);
      } else if (window.innerWidth <= 1260) {
        setMoviesPerPage(4);
      } else {
        setMoviesPerPage(5);
      }
    };

    updateMoviesPerPage(); // Set on initial load

    window.addEventListener("resize", updateMoviesPerPage);
    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  const displayedMovies = movies.slice(
    currentIndex,
    currentIndex + moviesPerPage
  );

  const handleNext = () => {
    if (currentIndex + moviesPerPage < movies.length) {
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
            <button
              className="scroll-button prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <img src={videoIconLeft} alt="cinema-" />
            </button>
            <ul className="movies-list">
              {displayedMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="movie-item"
                  onClick={() => handleMovieClick(movie.id)} // Handle click
                  style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                  <p className="movie-title">{movie.title}</p>
                  {/* <p className="movie-releaseDate">{movie.release_date}</p>
                  <p className="movie-releaseDate">{movie.id}</p> */}
                </li>
              ))}
            </ul>

            {/* <ul className="movies-list">
              {displayedMovies.map((movie) => (
                <li key={movie.id} className="movie-item">
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                  <p className="movie-title">{movie.title}</p>
                  <p className="movie-releaseDate">{movie.release_date}</p>
                </li>
              ))}
            </ul> */}
            <button
              className="scroll-button next"
              onClick={handleNext}
              disabled={currentIndex + moviesPerPage >= movies.length}
            >
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
