import axios from "axios";

axios.defaults.baseURL = "https://sharesphere-8737cda00b1a.herokuapp.com";
axios.defaults.headers["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
