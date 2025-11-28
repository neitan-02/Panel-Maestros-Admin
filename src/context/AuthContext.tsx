import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Maestro, Admin, UserRole } from "../types/auth";

interface AuthContextType {
  user: Maestro | Admin | null;
  token: string | null;
  isLoading: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  login: (data: LoginData) => Promise<Maestro | Admin>;
  logout: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  cct?: string;
  grado?: string;
  role: UserRole;
}

interface LoginData {
  email: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuración centralizada de URLs
const API_BASE_URL = "http://3.137.155.206:5000";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Maestro | Admin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const register = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      let endpoint = "";
      
      // CORRECCIÓN: Usar 'maestro' en minúsculas para coincidir con el backend
      if (data.role === 'maestro') {
        endpoint = `${API_BASE_URL}/api/maestros/register`;
      } else if (data.role === 'admin') {
        endpoint = `${API_BASE_URL}/admin/register`;
      } else {
        throw new Error("Rol no válido");
      }

      console.log("🔐 Registrando en:", endpoint);
      console.log("📦 Datos enviados:", data);

      const response = await axios.post(endpoint, data, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ Respuesta del registro:", response.data);

      // Si el registro es exitoso, hacer login automático
      try {
        await login({ email: data.email, password: data.password, role: data.role });
        return { success: true, message: "Registro exitoso" };
      } catch (loginError) {
        console.log("⚠️ Registro exitoso pero login automático falló:", loginError);
        return { success: true, message: "Registro exitoso. Por favor inicia sesión." };
      }
    } catch (error: any) {
      console.error("❌ Error completo en registro:", error);
      
      // Manejo detallado de errores
      if (error.response) {
        console.error("📊 Response data:", error.response.data);
        console.error("📊 Response status:", error.response.status);
        
        if (error.response.status === 500) {
          throw new Error("Error interno del servidor. Contacta al administrador.");
        } else if (error.response.status === 400) {
          const serverMsg = error.response.data.msg || error.response.data.message;
          throw new Error(serverMsg || "Datos inválidos o usuario ya existe");
        } else if (error.response.status === 404) {
          throw new Error("Endpoint no encontrado. Verifica la configuración del servidor.");
        } else {
          const serverMsg = error.response.data.msg || error.response.data.message;
          throw new Error(serverMsg || `Error del servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        console.error("🌐 No response received:", error.request);
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet y que el servidor esté activo.");
      } else if (error.code === 'ECONNABORTED') {
        throw new Error("Tiempo de espera agotado. El servidor está tardando demasiado en responder.");
      } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        throw new Error("Error de red. Verifica tu conexión a internet.");
      } else {
        throw new Error(error.message || "Error desconocido al registrar usuario");
      }
    }
  };

  const login = async (data: LoginData): Promise<Maestro | Admin> => {
    try {
      let endpoint = "";
      let userEndpoint = "";
      
      // CORRECCIÓN: Usar 'maestro' en minúsculas para coincidir con el backend
      if (data.role === 'maestro') {
        endpoint = `${API_BASE_URL}/api/maestros/login`;
        userEndpoint = `${API_BASE_URL}/api/maestros/me`;
      } else if (data.role === 'admin') {
        endpoint = `${API_BASE_URL}/admin/login`;
        userEndpoint = `${API_BASE_URL}/admin/me`;
      } else {
        throw new Error("Rol no válido");
      }

      console.log("🔐 Haciendo login en:", endpoint);
      
      const res = await axios.post(endpoint, {
        email: data.email,
        password: data.password
      }, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const { token } = res.data;
      console.log("✅ Token recibido:", token ? "SÍ" : "NO");
      
      setToken(token);
      localStorage.setItem('token', token);

      // Obtener datos del usuario
      console.log("👤 Obteniendo datos del usuario desde:", userEndpoint);
      const userRes = await axios.get(userEndpoint, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });
      
      const userData = userRes.data;
      console.log("✅ Datos del usuario:", userData);
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error: any) {
      console.error("❌ Error en login:", error);
      
      if (error.response) {
        console.error("📊 Response data:", error.response.data);
        console.error("📊 Response status:", error.response.status);
        
        if (error.response.status === 404) {
          throw new Error("Endpoint no encontrado. Verifica que el servidor tenga los endpoints configurados.");
        } else if (error.response.status === 401) {
          throw new Error("Credenciales inválidas. Verifica tu email y contraseña.");
        } else if (error.response.status === 400) {
          const serverMsg = error.response.data.msg || error.response.data.message;
          throw new Error(serverMsg || "Credenciales inválidas");
        } else if (error.response.status === 500) {
          throw new Error("Error interno del servidor. Intenta más tarde.");
        } else {
          const serverMsg = error.response.data.msg || error.response.data.message;
          throw new Error(serverMsg || `Error del servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      } else if (error.code === 'ECONNABORTED') {
        throw new Error("Tiempo de espera agotado. El servidor está tardando demasiado.");
      } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        throw new Error("Error de conexión con el servidor. Verifica que el servidor esté corriendo.");
      } else {
        throw new Error(error.message || "Error al iniciar sesión. Intenta de nuevo.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};