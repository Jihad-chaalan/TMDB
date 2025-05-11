import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../util/API";
import { useNavigate } from "react-router-dom";
import "./Popular.css"; // Optional: create this CSS file for styling

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularMovies().then((data) => {
      if (data.length > 0) {
        setMovies(data);
      }
    });
  }, []);

  return (
    <div className="popular-container">
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
