import axios from "axios";
import TokenService from "./token.service";
import {config} from "../utils/constants";

const instance = axios.create({
    baseURL: config.url.API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
             config.headers["Authorization"] = 'Bearer ' + token;  // for Django back-end
            //config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/token/" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/token/refresh/", {
                        refresh: TokenService.getLocalRefreshToken(),
                    });

                    const { access } = rs.data;
                    TokenService.updateLocalAccessToken(access);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;