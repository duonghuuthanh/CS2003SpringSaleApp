import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/SaleAppV1";

export const endpoints = {
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "products": `${SERVER_CONTEXT}/api/products/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
}

export const authApis = () => {
    return axios.create({
        baseURL: "http://localhost:8085",
        headers: {
            "Authorization": cookie.load("token")
        }
    });
}

export default axios.create({
    baseURL: "http://localhost:8085"
});