import axios from "axios";

const SERVER_CONTEXT = "/SaleApp";

export const endpoints = {
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "products": `${SERVER_CONTEXT}/api/products/`,
}

export default axios.create({
    baseURL: "http://localhost:8085"
});