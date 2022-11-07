import api from '../config'

export const registerApi = (data) => {
	return api.post('/auth/register', data)
}

export const loginApi = (data) => {
	return api.post('/auth/login', data)
}
export const activateEmailApi = (token) => {
	return api.post('/auth/activate', { token })
}
export const forgotPasswordApi = (data) => {
	return api.post('/auth/forgot-password', data)
}
export const resetPasswordApi = (data) => {
	return api.post('/auth/reset-password', data)
}
