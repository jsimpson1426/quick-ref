import http from "./http";

const endPoint = "/users";

export function registerUser(user){
    return http.post(endPoint, {
        email: user.email,
        password: user.password
    });
}