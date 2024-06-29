import axios from "axios";
import rateLimit from "axios-rate-limit";
import axiosRetry from "axios-retry";

const http = rateLimit(axios.create(), {
  maxRequests: 60,
  perMilliseconds: 60000,
  maxRPS: 3,
});

axiosRetry(http, {
  retries: 3, // Retry up to 3 times
  retryDelay: axiosRetry.exponentialDelay, // Use exponential backoff strategy
  retryCondition: (error) => {
    return axiosRetry.isRetryableError(error); // Retry on network errors or 429 rate limiting errors
  },
});

export default http;
