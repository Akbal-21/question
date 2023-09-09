import axios from "axios";

export const ssApi = axios.create({
	baseURL: "/api",
});

export const ssPythonApi = axios.create({
	baseURL: "http://localhost:5000",
});
