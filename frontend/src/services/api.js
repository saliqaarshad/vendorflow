import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vendorflow-backend.vercel.app/api',
});

export const getVendors = (search = '') => API.get(`/vendors?search=${search}`);
export const getVendor = (id) => API.get(`/vendors/${id}`);
export const createVendor = (data) => API.post('/vendors', data);
export const updateVendor = (id, data) => API.put(`/vendors/${id}`, data);
export const deleteVendor = (id) => API.delete(`/vendors/${id}`);

export const getQuotations = () => API.get('/quotations');
export const getQuotation = (id) => API.get(`/quotations/${id}`);
export const createQuotation = (data) => API.post('/quotations', data);
export const updateQuotation = (id, data) => API.put(`/quotations/${id}`, data);
export const deleteQuotation = (id) => API.delete(`/quotations/${id}`);
export const getDashboardStats = () => API.get('/quotations/dashboard');
export const compareQuotations = (title) => API.get(`/quotations/compare?title=${title}`);