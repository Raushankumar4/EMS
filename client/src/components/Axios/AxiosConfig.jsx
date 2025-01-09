import axios from "axios";
import store from "../../Redux/store";

const configureAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const errorHandler = async (error) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      try {
        return await axios.request(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(
      error?.response?.data?.message || error.message || "An error occurred"
    );
  };

  instance.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
  );

  const responseBody = (response) => {
    if (!response?.data) throw new Error("No response data received");
    return response.data;
  };

  return {
    get: (url, headers = {}) =>
      instance.get(url, { headers }).then(responseBody),
    post: (url, body, headers = {}) =>
      instance.post(url, body, { headers }).then(responseBody),
    put: (url, body, headers = {}) =>
      instance.put(url, body, { headers }).then(responseBody),
    patch: (url, body, headers = {}) =>
      instance.patch(url, body, { headers }).then(responseBody),
    delete: (url, headers = {}) =>
      instance.delete(url, { headers }).then(responseBody),
  };
};

const requests = configureAxios();
export default requests;
