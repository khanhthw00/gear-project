import axios, { post } from 'axios';

export function getCategory() {
	return axios({
		withCredentials: true,
		method: "GET",
		url: `http://localhost:3000/loaisanpham`
	});
}
