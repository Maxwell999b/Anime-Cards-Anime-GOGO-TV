import { useState, useEffect } from "react";
import http from "./services/http";

// LRU Cache implementation (remains unchanged)
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.keys = [];
  }

  get(key) {
    if (this.cache.has(key)) {
      this.keys.splice(this.keys.indexOf(key), 1);
      this.keys.push(key);
      return this.cache.get(key);
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.keys.splice(this.keys.indexOf(key), 1);
    } else if (this.keys.length >= this.maxSize) {
      const oldestKey = this.keys.shift();
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
    this.keys.push(key);
  }
}

const lruCache = new LRUCache(20);

const useFetchData = (url, cacheKey, delayTime) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          let lruCachedData = lruCache.get(cacheKey);
          if (lruCachedData) {
            setData(lruCachedData);
          } else {
            let response = await http.get(url, { delayTime });
            let responseData = response.data.data || [];
            sessionStorage.setItem(cacheKey, JSON.stringify(responseData));
            lruCache.set(cacheKey, responseData);
            setData(responseData);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey, delayTime]);

  return { data, loading, error };
};

export default useFetchData;
