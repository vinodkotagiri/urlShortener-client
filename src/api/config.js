import axios from 'axios'
const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

export default api
