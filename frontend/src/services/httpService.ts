import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const app = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

const refreshClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

app.interceptors.response.use(
    (res) => res,
    async (err) => {
        const config = err.config;
        if (err.response?.status !== 401 || config._retry) {
            return Promise.reject(err);
        }

        config._retry = true;

        try {
            await refreshClient.post("/auth/refresh");
            return app(config);
        } catch (error) {
            return Promise.reject(error);
        }
    }
)

const http = {
    get: app.get,
    post: app.post,
    put: app.put,
    delete: app.delete,
}

export default http;