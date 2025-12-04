import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-node-js-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const adminService = {
  // Obtener perfil del admin 
  getProfile: () => api.get('/admin/me'),
  
  // Obtener todos los maestros 
  getAllMaestros: () => api.get('/admin/maestros'),
  
  // Obtener todos los usuarios (estudiantes)
  getAllUsers: () => api.get('/admin/users'),
  
  // Obtener usuarios por maestro 
  getUsersByMaestro: (maestroId: string) => api.get(`/admin/maestro/${maestroId}/users`),
  
  // Cambiar contraseña de usuario 
  changeUserPassword: (userId: string, password: string) => 
    api.put(`/admin/user/${userId}/password`, { password }),
  
  // Cambiar contraseña de maestro 
  changeMaestroPassword: (maestroId: string, password: string) => 
    api.put(`/admin/maestro/${maestroId}/password`, { password }),
};

export default api;