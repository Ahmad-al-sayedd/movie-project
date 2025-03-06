import  { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import "./GenreMovies.scss";

export default function GenreMovies() {
  const { genre } = useParams(); // Get genre from URL
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const {TMDBkey} = useContext(SearchContext);

  const genreMap = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    thriller: 53,
    war: 10752,
    western: 37,
  };

  useEffect(() => {
    const genreId = genreMap[genre.toLowerCase()]; // getting to the root of genres of TMDB
    if (!genreId) return;

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDBkey}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [genre]);

  return (
    <> 
     <h2>Movies in {genre.toUpperCase()}</h2>
    <div className="movies-container_div">
     
      <div className="moviesContainer">
        {movies.map((movie) => (
          <div
            className="movieContainer"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)} // Navigating to details
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "80%",
                objectFit: "cover",
                padding: "10px 0",
                cursor: "pointer",
              }}
            />
            <h4>{movie.title}</h4>
            <p style={{ fontSize: "smaller" }}>
              {movie.overview.slice(0, 100) + "..."}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
