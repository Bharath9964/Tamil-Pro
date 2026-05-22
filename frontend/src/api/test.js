import api from './client'

export const getContent = () => api.get('/content/get')
export const submitTest = (payload) => api.post('/test/submit', payload)
export const updateProgress = (payload) => api.post('/progress/update', payload)
