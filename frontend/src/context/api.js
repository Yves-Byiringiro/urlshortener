import axios from 'axios';
const baseURL = 'http://localhost:8000';


export const reqInstance = axios.create({
  baseURL: baseURL,
})

export const apiRequest = async (url, method, data = {}, thunkAPI, requiresAuth = false) => {
  try {
    const headers = {};

    if (requiresAuth) {
      const tokenData = await JSON.parse(localStorage.getItem('authTokens'))?.access;
      const accessToken = tokenData ? tokenData.access : null;
      if (tokenData) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const config = {
      baseURL: baseURL,
      url,
      method: method.toLowerCase(),
      headers,
    };

    if (["post", "put"].includes(method.toLowerCase())) {
      config.data = data;
    } else if (["get", "delete"].includes(method.toLowerCase())) {
      config.params = data;
    }

    const response = await axios(config);
    const responseData = response?.data;
    const authTokens = responseData?.tokens;

    if (responseData.tokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    }
    return responseData;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if ([400, 401, 409].includes(status)) {
        return thunkAPI.rejectWithValue(data.error || data);
      }
    }
    return thunkAPI.rejectWithValue("Sorry, something went wrong. Try again!");
  }
};