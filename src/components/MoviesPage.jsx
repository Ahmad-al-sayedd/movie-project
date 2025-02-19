import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import './HomePage/HomePage.scss'
const MoviesPage = () => {
  const { addingToFavorite, pagesMovies, handlePagination, page } =
    useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    handlePagination(page);
  }, [page]);

  return (
    <div className="movies-container_div">
      <ul className="moviesContainer">
        {pagesMovies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <div className="expand">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
                alt={movie.Title + " Poster"}
                style={{
                  width: "80%",
                  objectFit: "cover",
                  padding: "10px 0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              />
            </div>
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre || "N/A"}</p>
            <p>Rating: {movie.imdbRating || "N/A"}</p>
            <button className="favorites-button" onClick={() => addingToFavorite(movie)}>
              Add to favorite
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
