import http from "./http";
import {apiEndpoint} from "./config.json";

const endPoint = apiEndpoint + "/users";

export function registerUser(user){
    return http.post(endPoint, {
        email: user.email,
        password: user.password
    });
}