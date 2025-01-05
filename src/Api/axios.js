import axios from "axios"

const axiosInstance = axios.create({
    // local instance of firebase functions
    // baseURL: "http://127.0.0.1:5001/website-21dc9/us-central1/api",
    // deployed version of amazon server on render.com
    baseURL: "https://amazon-api-deploy-5pcb.onrender.com",
})

export {axiosInstance}