import { useState, useEffect } from "react";
import http from "./services/http";

const useFetchData = (url, cacheKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          let retryCount = 0;
          let response = null;

          while (retryCount < 3) {
            // Retry up to 3 times
            try {
              response = await http.get(url);
              break; // Break out of retry loop if request is successful
            } catch (error) {
              if (error.response && error.response.status === 429) {
                // Retry after exponentially increasing time
                const delay = Math.pow(2, retryCount) * 1000; // exponential backoff
                await new Promise((resolve) => setTimeout(resolve, delay));
                retryCount++;
              } else {
                throw error; // Throw any other errors
              }
            }
          }

          if (response) {
            setData(response.data.data);
            sessionStorage.setItem(cacheKey, JSON.stringify(response.data.data));
          } else {
            throw new Error("Request failed after multiple retries");
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey]);

  return { data, loading, error };
};

export default useFetchData;
