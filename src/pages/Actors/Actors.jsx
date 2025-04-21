import { useState, useEffect } from "react";
import { fetchPopularActor } from "../../util/API";
import { useNavigate } from "react-router-dom";
import "./Actors.css";

const PopularActors = () => {
  const [actors, setActors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [curentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    const getActors = async () => {
      try {
        const data = await fetchPopularActor(curentPage);
        setActors(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };
    getActors();
  }, [curentPage]);

  const handleActorClick = (actorId) => {
    navigate(`/actors/${actorId}`);
    console.log(actorId);
  };

  return (
    <>
      <h2>Popular Actors</h2>
      <div className="actors-container">
        <ul className="actorsList">
          {actors.map((actor, index) => (
            <li
              key={actor.id || index}
              className="actor-card"
              onClick={() => handleActorClick(actor.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                className="actor-image"
              />
              <p className="actor-name">{actor.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={curentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {curentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={curentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default PopularActors;
