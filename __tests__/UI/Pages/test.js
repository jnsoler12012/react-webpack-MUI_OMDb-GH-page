import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueries, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieStats from './MovieStats';

const queryClient = new QueryClient();

// Fetch movies with pagination and search filter
const fetchMovies = async ({ queryKey }) => {
    const [_key, { searchQuery, page, apiKey }] = queryKey;
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${apiKey}`);
    return response.data.Search ? response.data.Search : [];
};

// Fetch movie details
const fetchMovieDetails = async ({ queryKey }) => {
    const [_key, { movieId, apiKey }] = queryKey;
    const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
    return response.data;
};

const Movies = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const apiKey = 'YOUR_OMDB_API_KEY';

    // Fetch movies based on search query and page number
    const { data: movies, refetch } = useQuery(['movies', { searchQuery: query, page, apiKey }], fetchMovies, {
        keepPreviousData: true,
    });

    // Fetch detailed movie data for each movie in the list
    const movieDetailsQueries = useQueries(
        movies ? movies.map(movie => ({
            queryKey: ['movieDetails', { movieId: movie.imdbID, apiKey }],
            queryFn: fetchMovieDetails,
        })) : []
    );

    const detailedMovies = movieDetailsQueries.map(result => result.data).filter(Boolean);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);  // Reset to first page on new search
        refetch();
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };



    const fetchMovieDetails = async ({ queryKey }) => {
        const [_key, { movieId, apiKey }] = queryKey;
        const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
        return response.data;
    };
    
    const Movies = () => {
        const [query, setQuery] = useState('');
        const [page, setPage] = useState(1);
        const [movieIds, setMovieIds] = useState([]);
        const apiKey = 'YOUR_OMDB_API_KEY';
    
        // Fetch movies based on search query and page number
        const { data: movies, refetch, isLoading, isError } = useQuery({
            queryKey: ['movies', { searchQuery: query, page, apiKey }],
            queryFn: fetchMovies,
            keepPreviousData: true,
            onSuccess: (data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setMovieIds(data.map(movie => movie.imdbID));
                } else {
                    setMovieIds([]);
                }
            }
        });
    
        // Fetch detailed movie data for each movie in the list
        const movieDetailsQueries = useQueries(
            movieIds.map(movieId => ({
                queryKey: ['movieDetails', { movieId, apiKey }],
                queryFn: fetchMovieDetails,
            }))
        );
    
        const detailedMovies = movieDetailsQueries
            .filter(query => query.data)
            .map(query => query.data);
    
        const handleSearch = (e) => {
            e.preventDefault();
            setPage(1);  // Reset to first page on new search
            refetch();
        };
    
        const handlePageChange = (newPage) => {
            setPage(newPage);
            refetch();
        };
    
        if (isLoading) {
            return <div>Loading...</div>;
        }
    
        if (isError) {
            return <div>Error fetching data...</div>;
        }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar película..."
                />
                <button type="submit">Buscar</button>
            </form>
            <div>
                {detailedMovies.map(movie => (
                    <div key={movie.imdbID}>
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>
                        <p>Director: {movie.Director}</p>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span>Página {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                >
                    Siguiente
                </button>
            </div>
            <MovieStats movies={detailedMovies} />
        </div>
    );
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <Movies />
    </QueryClientProvider>
);

export default App;
