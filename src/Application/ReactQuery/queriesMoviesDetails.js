import { useQueries } from "@tanstack/react-query";
import { getMoviesDetails } from "../AxiosPetitions/Get";

export default function ({ movies, apiKey }) {
    console.log(movies);
    const moviesList = (Array.isArray(movies?.Search)) ? movies?.Search : [];
    return useQueries({
        queries: moviesList.map(movieInfo => ({
            queryKey: ['movieDetails', { movieId: movieInfo.imdbID, apiKey }],
            queryFn: getMoviesDetails,
            combine: (results) => {
                return {
                    data: results.map((result) => result.data),
                    pending: results.some((result) => result.isPending),
                }
            },
        }))
    })
}