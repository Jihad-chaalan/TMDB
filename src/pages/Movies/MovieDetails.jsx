import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../util/API.js";
import "./MovieDetails.css";
import PlayImg from "../../assets/icons8-pot-player-64.png";

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [selectedMovie, setSelectedMovie] = useState(null); // Store movie details
  const [showTrailer, setShowTrailer] = useState(false); // Control trailer visibility

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(id); // Fetch movie details
      setSelectedMovie(movieData);
    };
    getMovieDetails();
  }, [id]); // Added `id` to dependencies

  // Toggle trailer visibility
  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  // Close the trailer
  const closeTrailer = () => {
    setShowTrailer(false);
  };

  if (!selectedMovie) {
    return (
      <div className="movie-details loading">
        <div className="Movie-Poster skeleton-box"></div>
        <div className="movie-info">
          <h1 className="skeleton-box" style={{ width: "50%" }}></h1>
          <p className="skeleton-box" style={{ width: "80%" }}></p>
          <p className="skeleton-box" style={{ width: "60%" }}></p>
        </div>
      </div>
    );
  }
  return (
    <div className="movie-details">
      {/* Movie Poster */}
      <img
        className="Movie-Poster"
        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />

      {/* Movie Information */}
      <div className="movie-info">
        <h1>{selectedMovie.title}</h1>
        {selectedMovie.tagline && (
          <h3 className="tagline">{selectedMovie.tagline}</h3>
        )}

        <p>
          <strong>Release Date:</strong> {selectedMovie.release_date}
        </p>
        <p>
          <strong>Overview:</strong> {selectedMovie.overview}
        </p>
        <p className="rating">
          <strong>Rating:</strong>{" "}
          {selectedMovie.vote_average
            ? selectedMovie.vote_average.toFixed(1)
            : "N/A"}{" "}
          ⭐
        </p>

        {/* Genres */}
        {selectedMovie.genres && selectedMovie.genres.length > 0 && (
          <p>
            <strong>Genres:</strong>{" "}
            {selectedMovie.genres.map((genre) => genre.name).join(", ")}
          </p>
        )}

        <p>
          <strong>Runtime:</strong> {selectedMovie.runtime} minutes
        </p>

        {/* Homepage Link */}
        {selectedMovie.homepage && (
          <p>
            <strong>More Info:</strong>{" "}
            <a
              href={selectedMovie.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website
            </a>
          </p>
        )}

        {/* Trailer Link */}
        {selectedMovie.trailerUrl && (
          <p>
            <button onClick={toggleTrailer}>
              {/* {showTrailer ? "Hide Trailer" : "Play Trailer"} */}
              <strong>Play Trailer</strong>{" "}
              <img className="Play-Image" src={PlayImg} alt="Play Trailer" />
            </button>
          </p>
        )}

        {/* Embedded Trailer Video */}
        {showTrailer && selectedMovie.trailerUrl && (
          <div className="trailer-container">
            {/* Close Button */}
            <button className="close-trailer" onClick={closeTrailer}>
              X
            </button>
            <iframe
              width="100%"
              height="500"
              src={selectedMovie.trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
