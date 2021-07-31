import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT;

export const api = axios.create({ baseURL: URL });
