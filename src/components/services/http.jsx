import axios from "axios";
import rateLimit from "axios-rate-limit";
import axiosRetry from "axios-retry";
// this based on this Rate Limiting
// Duration	Requests
// Daily	Unlimited
// Per Minute	60 requests
// Per Second	3 requests
// Note: It's still possible to get rate limited from MyAnimeList.net instead.

const http = rateLimit(axios.create(), {
  maxRequests: 60,
  perMilliseconds: 60000,
  maxRPS: 3,
});

axiosRetry(http, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isRetryableError(error) || (error.response && error.response.status === 429);
  },
});

export default http;
