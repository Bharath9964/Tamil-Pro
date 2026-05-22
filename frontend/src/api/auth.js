import api from './client'

export const registerUser = (payload) => api.post('/auth/register', payload)
export const loginUser = (payload) => api.post('/auth/login', payload)
export const updateDisplayName = (payload) => api.put('/auth/display-name', payload)
