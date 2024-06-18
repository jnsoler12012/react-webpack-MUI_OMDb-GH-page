import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import getMoviesDetails from "../../../src/Application/AxiosPetitions/Get/getMoviesDetails";
import queriesMoviesDetails from "../../../src/Application/ReactQuery/queriesMoviesDetails";


jest.mock("../../../src/Application/AxiosPetitions/Get/getMoviesDetails");



const queryClient = new QueryClient();

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe("useMovieQueries", () => {
    const movies = {
        Search: [
            { imdbID: "tt0111161" },
            { imdbID: "tt0068646" },
        ]
    };
    const apiKey = "testapikey";

    afterEach(() => {
        queryClient.clear();
    });

    it("should fetch movie details successfully", async () => {
        getMoviesDetails
            .mockResolvedValueOnce({ data: { Title: "The Shawshank Redemption" } })
            .mockResolvedValueOnce({ data: { Title: "The Godfather" } });

        const { result } = renderHook(() => queriesMoviesDetails({ movies, apiKey }), { wrapper });

        await waitFor(() => {
            const [firstMovie, secondMovie] = result.current;
            expect(firstMovie.data.Title).toBe("The Shawshank Redemption");
            expect(secondMovie.data.Title).toBe("The Godfather");
        });
    });

    it("should handle errors in fetching movie details", async () => {
        getMoviesDetails
            .mockRejectedValueOnce(new Error("Network Error"))
            .mockResolvedValueOnce({ data: { Title: "The Godfather" } });

        const { result } = renderHook(() => queriesMoviesDetails({ movies, apiKey }), { wrapper });

        await waitFor(() => {
            const [firstMovie, secondMovie] = result.current;
            expect(firstMovie.error).toBeTruthy();
            expect(secondMovie.data.Title).toBe("The Godfather");
        });
    });

    it("should handle loading state correctly", async () => {
        getMoviesDetails.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 100)));

        const { result } = renderHook(() => queriesMoviesDetails({ movies, apiKey }), { wrapper });

        expect(result.current.some(query => query.isLoading)).toBe(true);

        await waitFor(() => {
            expect(result.current.some(query => query.isLoading)).toBe(false);
        });
    });
});