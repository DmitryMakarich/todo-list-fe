import axios from "axios";

export const getApiAxiosInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = getApiAxiosInstance(
  process.env.REACT_APP_BACK_END_URL as string
);

export const setAxiosAuthorization = (accessToken: string) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};