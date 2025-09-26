import React, { useState, useEffect, useMemo } from "react";

// --- Components ---
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import SearchBar from "../../components/common/SearchBar";

// --- Hooks & Slices ---
import { useGetAllMoviesMutation } from "../../slices/movieApiSlice";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [getAllMovies, { isLoading, isError }] = useGetAllMoviesMutation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies().unwrap();
        
        let moviesData = []; // Default to a safe empty array
        if (response && Array.isArray(response.movies)) {
          moviesData = response.movies;
        } else if (Array.isArray(response)) {
          moviesData = response;
        } else {
          console.warn("Unexpected API response structure, defaulting to empty array:", response);
        }
        setMovies(moviesData); // Crucially, we always set the state to an array

      } catch (error) {
        console.error("Failed to fetch movies. This is likely a backend issue.", error);
        setMovies([]); // On error, guarantee it's an empty array to prevent crashes
      }
    };

    fetchMovies();
  }, [getAllMovies]);

  const filteredMovies = useMemo(() => {
    if (!Array.isArray(movies)) return []; // Extra safeguard
    if (!searchTerm) {
      return movies;
    }
    return movies.filter((movie) =>
      movie && typeof movie.title === 'string' && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  // This render logic is now more robust against errors and unexpected data.
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    // Display a clear error message if the backend fails
    if (isError) {
      return <ErrorDisplay message="Oops! The server encountered an error. Please check the backend console and try again." />;
    }
    
    // Final check to prevent passing non-arrays to the Movies component
    if (!Array.isArray(filteredMovies)) {
        console.error("filteredMovies is not an array. Rendering nothing to prevent a crash.");
        return <ErrorDisplay message="There was a problem with the movie data format." />;
    }

    if (filteredMovies.length === 0 && !isLoading) { // Added !isLoading check
      return (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">
            {searchTerm ? "No movies found matching your search." : "No movies available at the moment."}
          </p>
        </div>
      );
    }

    return <Movies movies={filteredMovies} />;
  };

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
              Movie Showcase
            </h1>
            <p className="text-lg text-slate-600">
              Discover your next favorite film
            </p>
          </header>

          <div className="mb-12 max-w-2xl mx-auto">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          
          {renderContent()}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

