import axios from "axios";
import { getMovies } from "../../../../src/Application/AxiosPetitions/Get";

jest.mock("axios");

describe("fetchMovies", () => {
    it("should return data when API call is successful", async () => {
        const mockData = { Search: [{ Title: "The Godfather", Year: "1972" }], totalResults: "1", Response: "True" };
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getMovies({
            queryKey: ["fetchMovies", { search: "godfather", page: 1, apiKey: "testapikey" }]
        });

        expect(result).toEqual(mockData);
    });

    it("should return empty object when no data is returned", async () => {
        const mockData = {};
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getMovies({
            queryKey: ["fetchMovies", { search: "nonexistent", page: 1, apiKey: "testapikey" }]
        });

        expect(result).toEqual(mockData);
    });

    it("should handle API call failure", async () => {
        const mockError = new Error("Network Error");
        axios.get.mockRejectedValue(mockError);

        try {
            await getMovies({
                queryKey: ["fetchMovies", { search: "errorcase", page: 1, apiKey: "testapikey" }]
            });
        } catch (error) {
            expect(error).toEqual(mockError);
        }
    });
});