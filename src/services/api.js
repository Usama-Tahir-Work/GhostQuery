import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

const API_BASE = VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

/* ── Employee CRUD ─────────────────────────────────── */

export const getEmployees = () =>
  api.get('/employees').then((r) => r.data);

export const getEmployeeById = (id) =>
  api.get(`/employees/${id}`).then((r) => r.data);

export const getEncryptedEmployee = (id) =>
  api.get(`/employees/${id}/encrypted`).then((r) => r.data);

export const createEmployee = (data) =>
  api.post('/employees', data).then((r) => r.data);

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data).then((r) => r.data);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`).then((r) => r.data);

/* ── Encrypted Search ──────────────────────────────── */

export const searchEmployees = (searchTerm, fieldName = null) =>
  api.post('/employees/search', { searchTerm, fieldName }).then((r) => r.data);

export default api;
