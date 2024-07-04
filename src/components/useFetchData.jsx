import { useState, useEffect } from "react";
import http from "./services/http";

// LRU Cache implementation
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.keys = [];
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move accessed key to end (most recently used)
      this.keys.splice(this.keys.indexOf(key), 1);
      this.keys.push(key);
      return this.cache.get(key);
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.keys.splice(this.keys.indexOf(key), 1); // Remove existing key
    } else if (this.keys.length >= this.maxSize) {
      const oldestKey = this.keys.shift(); // Remove least recently used
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // Set new key
    this.keys.push(key);
  }
}

const lruCache = new LRUCache(20); // Set maximum cache size

const useFetchData = (url, cacheKey, delayTime) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cachedData = lruCache.get(cacheKey); // Retrieve from LRU cache
        if (cachedData) {
          setData(cachedData);
        } else {
          let response = await http.get(url, { delayTime });
          let responseData = response.data.data || []; // Handle potential empty response
          lruCache.set(cacheKey, responseData); // Cache the data
          setData(responseData);
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
