import axios from "axios";

const BASE_URL = "https://api.nekosapi.com/v3";

const getImageCharacters = async (imageId, limit = 4, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/${imageId}/characters`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching image characters:", error);
    throw error;
  }
};

export default getImageCharacters;
