import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import "./Favorites.scss"
export default function Favorites() {
  const { favoritesMovies, setFavoritesMovies } = useContext(SearchContext);

  //Filtirig movies and remove  it from favorite by clicking on the button
  const removeFromFavorite = (movie) => {
    const filtringMovies = favoritesMovies.filter(
      (m) => m.imdbID !== movie.imdbID
    );
    setFavoritesMovies(filtringMovies);
  };

  return (
    <div className="movies-container_div">
      <h2>{favoritesMovies.length === 0 && " No Favorite movies available"}</h2>
      <ul className="moviesContainer">
      {favoritesMovies.map((movie) => (
        <div className="movieContainer" key={movie.imdbID}>
          <h4>{movie.Title}</h4>
          <div className="expand">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
              alt={movie.Title + " Poster"}
              style={{
                width: "80%",
                height: "230px",

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
          <button  className="favorites-button" onClick={() => removeFromFavorite(movie)}>
            Remove From Favorite
          </button>
          
         
        </div>
      ))}
    </ul>
    </div>
  );
}
