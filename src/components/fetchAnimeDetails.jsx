import http from "./services/http";

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

const fetchAnimeDetails = async (id) => {
  const urls = [
    { key: "anime", url: `https://api.jikan.moe/v4/anime/${id}` },
    { key: "reviews", url: `https://api.jikan.moe/v4/anime/${id}/reviews` },
    { key: "news", url: `https://api.jikan.moe/v4/anime/${id}/news` },
    { key: "episodes", url: `https://api.jikan.moe/v4/anime/${id}/episodes` },
    { key: "voiceActors", url: `https://api.jikan.moe/v4/characters/${id}/voices` },
    { key: "galleryPictures", url: `https://api.jikan.moe/v4/anime/${id}/pictures` },
    { key: "characters", url: `https://api.jikan.moe/v4/anime/${id}/characters` },
    { key: "externalLinks", url: `https://api.jikan.moe/v4/anime/${id}/external` },
    { key: "staff", url: `https://api.jikan.moe/v4/anime/${id}/staff` },
    { key: "moreInfo", url: `https://api.jikan.moe/v4/anime/${id}/moreinfo` },
    { key: "streaming", url: `https://api.jikan.moe/v4/anime/${id}/streaming` },
    { key: "themes", url: `https://api.jikan.moe/v4/anime/${id}/themes` },
  ];

  const data = {};

  try {
    const fetchPromises = urls.map(async ({ key, url }) => {
      const cacheKey = `${key}_${id}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        data[key] = JSON.parse(cachedData);
      } else {
        const response = await http.get(url);
        const responseData = response.data.data || [];
        lruCache.set(cacheKey, responseData);
        sessionStorage.setItem(cacheKey, JSON.stringify(responseData));
        data[key] = responseData;
      }
    });

    await Promise.all(fetchPromises);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch anime details: ${error.message}`);
  }
};

export default fetchAnimeDetails;
