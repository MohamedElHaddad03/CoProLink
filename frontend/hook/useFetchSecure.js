import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import getBaseUrl from "../config";
const useFetchSecure = (endpoint, query, method = "GET") => {
  const [BASEURL,setBaseUrl]=useState('');

  useEffect(() => {
    const fetchBaseUrl = async () => {
        try {
            const BASEURL = await getBaseUrl();
            setBaseUrl(BASEURL);
        } catch (error) {
            console.error("Error fetching BASEURL:", error);
        }
    };

    fetchBaseUrl(); // Call the async function immediately
}, []);
  const baseUrl = BASEURL;
  const { user } = useAuth();
  console.log("Tokeeeeeeeen : ", user.Token)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method,
    url: `${baseUrl}/${endpoint}`,
    params: { ...query },
    // Add other options as needed (headers, data for POST/PUT, etc.)
    headers: {
      Authorization: "Token " + user.Token
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      // Check if response.data is already an object, and set it accordingly
      setData(typeof response.data === 'object' ? response.data : JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      setError(error);
      alert('Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };
  console.log("hook", data)

  return { data, isLoading, error, refetch };
};

export default useFetchSecure;



