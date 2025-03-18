import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTrendingMovies } from "../../util/API.js";
import "../Movies/MoiveDetails.css";

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movies, setMovies] = useState([]); // Store all movies

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchTrendingMovies(); // returns array of movies
      setMovies(movieData);
    };
    getMovieDetails();
  }, []);

  // Find movie by ID (convert id to number)
  const selectedMovie = movies.find((movie) => movie.id === parseInt(id));

  if (!selectedMovie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />
      <div className="movie-info">
        <h1>{selectedMovie.title}</h1>
        <p>
          <strong>Release Date:</strong> {selectedMovie.release_date}
        </p>
        <p>
          <strong>Overview:</strong> {selectedMovie.overview}
        </p>
        <p className="rating">
          <strong>Rating:</strong> {selectedMovie.vote_average} ⭐
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
