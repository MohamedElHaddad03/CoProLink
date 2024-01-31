import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import getBaseUrl from "../config";

const useFetchSecure = (endpoint, query, method = "GET") => {
  const [BASEURL, setBaseUrl] = useState('');
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const options = {
        method,
        url: `${BASEURL}/${endpoint}`,
        params: { ...query },
        headers: {
          Authorization: "Token " + user.Token
        },
      };
      const response = await axios.request(options);
      setData(typeof response.data === 'object' ? response.data : JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      setError(error);
    //  alert('Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const BASEURL = await getBaseUrl();
        setBaseUrl(BASEURL);
        console.log('hookkkkk', BASEURL);
      } catch (error) {
        console.error("Error fetching BASEURL:", error);
      }
    };

    fetchBaseUrl(); // Call the async function immediately
  }, []);

  useEffect(() => {
    if (BASEURL !== '') {
      fetchData(); // Fetch data when BASEURL changes
    }
  }, [BASEURL, endpoint, method, query, user.Token]);

  const refetch = () => {
    fetchData();
  };

  console.log("hook", data);

  return { data, isLoading, error, refetch, fetchData }; // Return fetchData function
};

export default useFetchSecure;
