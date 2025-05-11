import { useParams } from "react-router-dom";
import { fetchActorDetails } from "../../util/API";
import { useEffect, useState } from "react";
import "./ActorDetails.css";

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    fetchActorDetails(id)
      .then((actor) => {
        if (actor) {
          setActor(actor);
        } else {
          console.error("No actor data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching actor details:", error);
      });
  }, [id]);

  const toggleBio = () => setShowFullBio(!showFullBio);

  const getShortBio = (bio) => {
    if (!bio) return "No biography available.";
    const sentences = bio.split(". ");
    return sentences.slice(0, 2).join(". ") + "...";
  };

  if (!actor) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="actor-container">
      <div className="img-container">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "default-image-url.jpg"
          } // Default image if profile_path is missing
          alt={actor.name}
          className="actor-profile"
        />
      </div>
      <div className="info-container">
        <h2 className="actor-name">{actor.name}</h2>
        <div className="personal-info">
          <h3>Personal Info:</h3>
          <p className="info-item">
            Gender: {actor.gender === 1 ? "Female" : "Male"}
          </p>
          <p className="info-item">Birthday: {actor.birthday}</p>
          <p className="info-item">Place of Birth: {actor.place_of_birth}</p>
          <p className="info-item">
            <span style={{ color: "#ffc107" }}>IMDB</span> id: {actor.imdb_id}
          </p>
          <h3>Biography:</h3>
          <p className="info-item">
            {showFullBio || actor.biography.length < 150
              ? actor.biography
              : getShortBio(actor.biography)}
            {actor.biography.length >= 150 && (
              <span
                onClick={toggleBio}
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {showFullBio ? " Show less" : " Read more"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
