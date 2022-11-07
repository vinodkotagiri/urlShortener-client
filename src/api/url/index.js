import api from '../config'

export const shortenUrlApi = (url) => {
	return api.post('/url/shorten', url)
}
export const listShortenUrlsApi = (limit, skip) => {
	return api.get('/url?limit&skip')
}
