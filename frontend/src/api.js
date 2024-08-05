import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ameerku-cred-app.onrender.com/api'
});

export const apiProduct = {
    getProducts: () => api.get('/products'),
    getProduct: (id) => api.get(`/products/${id}`),
    createProduct: (data, token) => api.post('/products', data, {
        headers: { Authorization: `Bearer ${token}` }
    }),
    updateProduct: (id, data, token) => api.put(`/products/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    }),
    deleteProduct: (id, token) => api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const apiAuth = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data)
};
