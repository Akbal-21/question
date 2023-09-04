import axios from "axios";

export const ssApi = axios.create({
	baseURL: "/api",
});
