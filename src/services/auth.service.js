import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login(username, password) {
        return api
            .post("/token/", {
                username,
                password
            })
            .then(response => {
                if (response.data.access) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}


export default new AuthService();