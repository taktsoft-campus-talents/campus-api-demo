import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  async function handleLoadMovies() {
    const { data, status } = await axios.get(
      "https://campus-api-movies.onrender.com/movies/"
    );
    console.log(data.result);
    console.log("totalCount", data.totalCount);
    console.log("Status", status);
    setMovies(data.result);
  }

  async function handleLoadMovie(movieId) {
    try {
      const { data } = await axios.get(
        `https://campus-api-movies.onrender.com/movies/${movieId}`
      );
      console.log("Hallo");
      console.log(data);
      setMovieDetails(data);
    } catch (err) {
      alert("An error occurred!");
      console.log(err);
    }
  }

  return (
    <>
      <h1>API Demo</h1>
      <button onClick={handleLoadMovies}>Load Movies</button>
      {/* <button onClick={() => handleLoadMovie("tt0068646")}>
        Load Movie tt0068646
      </button> */}
      <div className="flex-container">
        <ul className="flex-child">
          {movies.map((movie) => {
            return <li key={movie.id}>{movie.title}</li>;
          })}
        </ul>
        <div className="flex-child movie-details">
          {movieDetails ? (
            <>
              <h2>{movieDetails.title}</h2>
              <p>{movieDetails.plot}</p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
