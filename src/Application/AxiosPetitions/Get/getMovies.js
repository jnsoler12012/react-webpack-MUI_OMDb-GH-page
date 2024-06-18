import axios from "axios";

export default async function ({ queryKey }) {
    const [_key, { search, page, apiKey }] = queryKey;
    const response = await axios.get(`http://www.omdbapi.com/?s=${search}&page=${page}&apikey=${apiKey}`);

    console.log(response);
    return response.data.Search ? response.data.Search : response.data;
};