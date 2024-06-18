import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import getMovies from "../../../src/Application/AxiosPetitions/Get/getMovies";
import queryMovie from "../../../src/Application/ReactQuery/queryMovie";

jest.mock("../../../src/Application/AxiosPetitions/Get/getMovies");

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe("useMoviesQuery", () => {
    const search = "Godfather";
    const page = 1;
    const apiKey = "testapikey";

    afterEach(() => {
        queryClient.clear();
    });

    it("should fetch movies successfully", async () => {
        const movies = {
            Search: [
                { imdbID: "tt0111161" },
                { imdbID: "tt0068646" },
            ]
        };

        getMovies.mockResolvedValueOnce(movies);

        const { result, waitForNextUpdate } = renderHook(() => queryMovie({ search, page, apiKey }), { wrapper });

        await waitForNextUpdate();

        expect(result.current.data).toEqual(movies);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeUndefined();
    });

    it("should handle errors in fetching movies", async () => {
        const errorMessage = "Failed to fetch movies";

        getMovies.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => queryMovie({ search, page, apiKey }), { wrapper });

        await waitForNextUpdate();

        expect(result.current.data).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toEqual(new Error(errorMessage));
    });

    it("should handle loading state correctly", async () => {
        const movies = {
            Search: [
                { imdbID: "tt0111161" },
                { imdbID: "tt0068646" },
            ]
        };

        getMovies.mockResolvedValueOnce(new Promise(resolve => setTimeout(() => resolve(movies), 100)));

        const { result, waitForNextUpdate } = renderHook(() => queryMovie({ search, page, apiKey }), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.data).toEqual(movies);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeUndefined();
    });
});