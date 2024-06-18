import axios from "axios";

export default async function ({ queryKey }) {
    const [_key, { movieId, apiKey }] = queryKey;
    const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
    return response.data;
};