import axios from 'axios';

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const getByUserId = (url, id) => axios.get(`${url}?userId=${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const updateItemBaseUrl = (url, obj) => axios.put(`${url}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export { getAll, getById, getByUserId, addItem, updateItem, deleteItem, updateItemBaseUrl };
