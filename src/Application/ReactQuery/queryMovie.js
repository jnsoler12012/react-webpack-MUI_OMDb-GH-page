
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../AxiosPetitions/Get";

export default function ({ search, page, apiKey }) {
    return useQuery({
        queryKey: ['movies', { search, page, apiKey }],
        queryFn: getMovies,
        keepPreviousData: true,
    });
}
