import axios from "axios";
import { getMoviesDetails } from "../../../../src/Application/AxiosPetitions/Get";

jest.mock("axios");

describe("fetchMovie", () => {
    it("should return data when API call is successful", async () => {
        const mockData = { Title: "The Godfather", Year: "1972" };
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getMoviesDetails({
            queryKey: ["fetchMovie", { movieId: "tt0068646", apiKey: "testapikey" }]
        });

        expect(result).toEqual(mockData);
    });

    it("should return empty object when no data is returned", async () => {
        const mockData = {};
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getMoviesDetails({
            queryKey: ["fetchMovie", { movieId: "invalidid", apiKey: "testapikey" }]
        });

        expect(result).toEqual(mockData);
    });

    it("should handle API call failure", async () => {
        const mockError = new Error("Network Error");
        axios.get.mockRejectedValue(mockError);

        try {
            await getMoviesDetails({
                queryKey: ["fetchMovie", { movieId: "errorcase", apiKey: "testapikey" }]
            });
        } catch (error) {
            expect(error).toEqual(mockError);
        }
    });
});