import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(true);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "ca545fede3122a9192147460dddba651", // Replace with your actual API key
            query: query,
          },
        }
      );

      if (response.data.results.length > 0) {
        setMovies(response.data.results);
        setHasResults(true);
      } else {
        setMovies([]);
        setHasResults(false);
      }
      setError(null);
    } catch (error) {
      setMovies([]);
      setHasResults(false);
      setError("Error fetching movies");
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: "ca545fede3122a9192147460dddba651",
          },
        }
      );

      setMovies(response.data.results);
      setHasResults(true);
      setError(null);
    } catch (error) {
      setMovies([]);
      setHasResults(false);
      setError("Error fetching popular movies");
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity (0.5 for 50% opacity)
  };

  return (
    <div
      className="container-fluid px-5 "
      style={{ backgroundColor: "#555555", height: "100%" }}
    >
      <div className="'container mx-5 ">
        <h1 className="text-center mb-4 pf-3px">Movie Search</h1>
        <p className="intro-text text-center">
          Welcome to the Movie Search app! Discover and explore a vast
          collection of movies. Enter the title of your favorite movie or
          explore popular ones below.
        </p>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control mx-4 rounded-5"
            placeholder="Enter movie title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary  rounded-5"
              type="button"
              onClick={searchMovies}
            >
              Search
            </button>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}
        {!hasResults && !error && (
          <div className="alert alert-info text-center font-weight-lg text-black; mt-4">
            <p>No movies found for the entered title.</p>
          </div>
        )}

        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-2 mb-2">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <div className="card h-100 position-relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="card-img-top h-100"
                    alt={movie.title}
                  />
                  <div style={overlayStyle}></div>
                  <div className="position-absolute bottom-0 start-50 translate-middle-x text-center w-100 mb-0">
                    <p
                      style={{
                        color: "white",
                        padding: "4px",
                        marginTop: "4px",
                      }}
                    >
                      {movie.title} ,480p 720p 1080p 2160p
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
