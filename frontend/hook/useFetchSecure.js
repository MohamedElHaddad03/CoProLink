import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSecure = (endpoint, query, method = "GET", token) => {
    const baseUrl = "http://127.0.0.1:8000/";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method,
        url: `http://127.0.0.1:8000/${endpoint}`,
        params: { ...query },
        // Add other options as needed (headers, data for POST/PUT, etc.)
        headers: { token },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
        } catch (error) {
            console.error("API Request Error:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetchSecure;
