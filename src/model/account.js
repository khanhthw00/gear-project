import axios, { post } from 'axios';

export function getUser() {
	return axios({
			withCredentials: true,
			method: "GET",
			url: `http://localhost:3000/taikhoan`
	});
}

export function postDangNhapquery(data) {

	//=== post kiểu query string 
	
	const username = data.username ? `&username=${data.username}` : "";
	const password = data.password ? `&password=${data.password}` : "";

	return axios({
		method: "POST",
		url: `http://localhost:3000/taikhoan?username=${username}&password=${password}` 
	});
}


export function postDangNhap(info) {
	const url = `http://localhost:3000/dangnhap`;
	
	// info = data object cần post lên 
	// post dạng body string 
	const config = {
			withCredentials: true,
			headers: {
				
					'Accept': 'application/json',
					'Content-Type': 'application/json',
			}
	}

	return post(url, info, config);
}
