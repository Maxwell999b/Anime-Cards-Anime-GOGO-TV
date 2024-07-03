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
          const response = await http.get(url);
          setData(response.data.data);
          sessionStorage.setItem(cacheKey, JSON.stringify(response.data.data));
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
