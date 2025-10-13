import _axios from "axios";

export const axios = _axios.create({
  baseURL: "https://mc-api.r-artemev.ru",
});

export const setBearerToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
