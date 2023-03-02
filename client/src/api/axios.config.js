import axios from "axios";

const backendAPI = "http://localhost:4000/api";

const savvyAPI = axios.create({
    baseURL: `${backendAPI}`,
    headers: {
        "content-type": "application/json",
    },
})

export default savvyAPI;