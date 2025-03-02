import { useContext, useEffect } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom"; // to link to movie details
import "../SearchPage/search.scss";

export default function SearchPage() {
  
  // Extracting values and functions from SearchContext
  const navigate = useNavigate();

  const {
    searchQuery,
    searchComponentData,
    handleSearchComponent,
    addingToFavorite,
  } = useContext(SearchContext);

  // Fetch movies whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearchComponent(searchQuery); // Fetch movies based on search query
    }
  }, [searchQuery, handleSearchComponent]); // Dependency on searchQuery to re-fetch when it changes

  return (
    <>
    <h2>Search Results for {searchQuery}</h2>
    <div className="movies-container_div" >
      

      {/* Render movies if any are found */}
      {searchComponentData.length > 0 ? (
      <ul className="moviesContainer">
      {searchComponentData.map((movie) => (
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
      ) : (
        <p>No movies found.</p> // Show message if no movies found
      )}
    </div>
    </>
  );
}
