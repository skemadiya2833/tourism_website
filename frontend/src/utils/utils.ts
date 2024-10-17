import axios from "axios";

export const pawdRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        axios.defaults.withCredentials = true;
        await axios.post("http://localhost:5001/auth/refresh-token");

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
      }
    }

    return Promise.reject(error);
  }
);
