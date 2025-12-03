import React, { useState, useEffect } from 'react';
import { Maestro, User as UserType, Student, SupportTicket } from '../types/auth';
import { LogOut, Users, BookOpen, Key, Search, Eye, MessageSquare, AlertTriangle, Clock, CheckCircle, X as XIcon, Reply, HelpCircle, Shield, Menu, RefreshCw, ChevronRight, Filter, UserPlus } from 'lucide-react';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import SupportTicketModal from '../modals/SupportTicketModal';
import CreateTicketModal from '../modals/CreateTicketModal';
import RespondTicketModal from '../modals/RespondTicketModal';
import TourGuide from './TourGuide';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/api';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('maestros');
  const [maestros, setMaestros] = useState<Maestro[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [showChangePassword, setShowChangePassword] = useState<Maestro | UserType | null>(null);
  const [showTicketModal, setShowTicketModal] = useState<SupportTicket | null>(null);
  const [showRespondTicket, setShowRespondTicket] = useState<SupportTicket | null>(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState({
    maestros: false,
    users: false,
    profile: false
  });
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalMaestros: 0,
    totalAlumnos: 0,
    ticketsAbiertos: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cargar maestros
  const fetchMaestros = async () => {
    try {
      setLoading(prev => ({ ...prev, maestros: true }));
      setError(null);
      const response = await adminService.getAllMaestros();
      
      const maestrosData = response.data.filter((m: Maestro) => m.role === 'maestro');
      setMaestros(maestrosData);
      setStats(prev => ({ ...prev, totalMaestros: maestrosData.length }));
      
      return maestrosData;
    } catch (error: any) {
      console.error('Error al cargar maestros:', error);
      setError('No se pudieron cargar los maestros. Verifica tu conexión.');
      return [];
    } finally {
      setLoading(prev => ({ ...prev, maestros: false }));
    }
  };

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      setError(null);
      const response = await adminService.getAllUsers();
      
      setUsers(response.data);
      
      const studentsData: Student[] = response.data.map((user: UserType) => ({
        id: user._id,
        name: user.username,
        teacherId: user.maestro?._id,
        grade: user.grado || user.maestro?.grado || 'Sin grado asignado',
        progress: { 
          block1: Math.floor(Math.random() * 100),
          block2: Math.floor(Math.random() * 100),
          block3: Math.floor(Math.random() * 100),
          block4: Math.floor(Math.random() * 100),
          block5: Math.floor(Math.random() * 100),
          block6: Math.floor(Math.random() * 100)
        },
        lastUpdated: new Date(user.createdAt)
      }));
      
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setStats(prev => ({ ...prev, totalAlumnos: response.data.length }));
      
      return response.data;
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error);
      setError('No se pudieron cargar los alumnos. Verifica tu conexión.');
      return [];
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Cargar perfil del admin
  const fetchAdminProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      const response = await adminService.getProfile();
      console.log('Perfil admin cargado:', response.data);
    } catch (error: any) {
      console.error('Error al cargar perfil:', error);
      // Si no hay endpoint /admin/me, no es crítico
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  // Manejar cambio de contraseña
  const handleChangePassword = async (id: string, newPassword: string, type: 'maestro' | 'user') => {
    try {
      if (type === 'maestro') {
        await adminService.changeMaestroPassword(id, newPassword);
        alert('Contraseña del maestro actualizada exitosamente');
      } else {
        await adminService.changeUserPassword(id, newPassword);
        alert('Contraseña del usuario actualizada exitosamente');
      }
      
      if (type === 'maestro') {
        fetchMaestros();
      } else {
        fetchUsers();
      }
      
      setShowChangePassword(null);
    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      alert('Error al cambiar la contraseña. Verifica tu conexión.');
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchAdminProfile();
    fetchMaestros();
  }, []);

  useEffect(() => {
    if (activeTab === 'maestros') {
      fetchMaestros();
    } else if (activeTab === 'students') {
      fetchUsers();
    }
  }, [activeTab]);

  // Filtros
  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter]);

  useEffect(() => {
    let filtered = students;

    if (studentSearchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(studentSearchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, studentSearchTerm]);

  const handleRespondTicket = (ticketId: string, response: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: 'in_progress' as const,
          resolution: response,
          updatedAt: new Date()
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets);
  };

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in_progress': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <XIcon className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'urgent': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTicketStats = () => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in_progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    return { total, open, inProgress, resolved };
  };

  const ticketStats = getTicketStats();

  // ========== RENDERIZADO PARA WEB RESPONSIVE ==========

  const renderMaestros = () => (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Maestros</p>
              <p className="text-2xl font-bold text-gray-900">{maestros.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{maestros.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nuevos (30 días)</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de maestros - CORREGIDO: Textos que no se salgan */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-gray-900 flex items-center truncate">
                <Users className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                <span className="truncate">Lista de Maestros</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1 truncate">Gestiona todos los maestros registrados en el sistema</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={fetchMaestros}
                disabled={loading.maestros}
                className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading.maestros ? 'animate-spin' : ''}`} />
                {loading.maestros ? 'Actualizando...' : 'Actualizar Lista'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {loading.maestros ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Cargando maestros...</p>
            </div>
          ) : error && activeTab === 'maestros' ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-4 max-w-md mx-auto">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold text-lg mb-2">Error de conexión</h4>
                <p className="text-sm mb-4">{error}</p>
                <button
                  onClick={fetchMaestros}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : maestros.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No hay maestros registrados</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Los maestros aparecerán aquí cuando se registren en el sistema a través del panel de autenticación.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={fetchMaestros}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Verificar nuevamente
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {maestros.map((maestro) => (
                <div key={maestro._id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl flex-shrink-0">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {maestro.username}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">{maestro.email}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 whitespace-nowrap">
                        Maestro
                      </span>
                      {maestro.grado && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 truncate max-w-[120px]">
                          {maestro.grado}
                        </span>
                      )}
                      {maestro.cct && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 truncate max-w-[150px]">
                          CCT: {maestro.cct}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500 truncate">
                      <p>Registrado: {new Date(maestro.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowChangePassword(maestro)}
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium group/btn whitespace-nowrap"
                    >
                      <Key className="w-4 h-4 mr-2 group-hover/btn:animate-pulse flex-shrink-0" />
                      <span className="truncate">Cambiar Contraseña</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros - CORREGIDO: Textos que no se salgan */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900 flex items-center truncate">
              <BookOpen className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
              <span className="truncate">Gestión de Alumnos</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1 truncate">Administra todos los estudiantes registrados por los maestros</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <div className="relative flex-1 sm:w-80 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o grado..."
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm shadow-sm"
              />
            </div>
            <button
              onClick={fetchUsers}
              disabled={loading.users}
              className="flex items-center justify-center px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading.users ? 'animate-spin' : ''}`} />
              {loading.users ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm text-green-700 font-medium truncate">Total Alumnos</p>
                <p className="text-2xl font-bold text-gray-900 truncate">{users.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm text-blue-700 font-medium truncate">Con Maestro Asignado</p>
                <p className="text-2xl font-bold text-gray-900 truncate">
                  {users.filter(u => u.maestro).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm text-purple-700 font-medium truncate">Sin Maestro</p>
                <p className="text-2xl font-bold text-gray-900 truncate">
                  {users.filter(u => !u.maestro).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Lista de alumnos - CORREGIDO: Textos que no se salgan */}
        <div>
          {loading.users ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Cargando lista de alumnos...</p>
            </div>
          ) : error && activeTab === 'students' ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-4 max-w-md mx-auto">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold text-lg mb-2">Error de conexión</h4>
                <p className="text-sm mb-4">{error}</p>
                <button
                  onClick={fetchUsers}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {studentSearchTerm ? 'No se encontraron alumnos' : 'No hay alumnos registrados'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {studentSearchTerm 
                  ? 'Intenta con otro término de búsqueda o verifica la ortografía'
                  : 'Los alumnos aparecerán aquí cuando los maestros los registren en el sistema'}
              </p>
              {studentSearchTerm && (
                <button
                  onClick={() => setStudentSearchTerm('')}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => {
                const user = users.find(u => u._id === student.id);
                
                return (
                  <div key={student.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-xl flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                            <h4 className="text-lg font-bold text-gray-900 truncate">
                              {student.name}
                            </h4>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 whitespace-nowrap flex-shrink-0">
                              {student.grade}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            {user?.maestro && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <span className="text-sm text-gray-600 truncate">
                                  Maestro: <span className="font-semibold">{user.maestro.username}</span> ({user.maestro.grado})
                                </span>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-3">
                              <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                                <span className="font-medium">ID:</span>
                                <span className="font-mono">{student.id.substring(0, 8)}...</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                                <span className="font-medium">Última actualización:</span>
                                <span>{student.lastUpdated.toLocaleDateString('es-MX')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                        <button
                          onClick={() => {
                            const user = users.find(u => u._id === student.id);
                            if (user) setShowChangePassword(user);
                          }}
                          className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Cambiar Contraseña
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      {/* Estadísticas de tickets - CORREGIDO: Textos que no se salgan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-gray-500 mr-4 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900 truncate">{ticketStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">Abiertos</p>
              <p className="text-2xl font-bold text-yellow-600 truncate">{ticketStats.open}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">En Progreso</p>
              <p className="text-2xl font-bold text-blue-600 truncate">{ticketStats.inProgress}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">Resueltos</p>
              <p className="text-2xl font-bold text-green-600 truncate">{ticketStats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de tickets - CORREGIDO: Textos que no se salgan */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-gray-900 flex items-center truncate">
                <MessageSquare className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                <span className="truncate">Tickets de Soporte</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1 truncate">Gestiona reportes y solicitudes del sistema</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <div className="relative flex-1 sm:w-64 min-w-[200px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white whitespace-nowrap min-w-[140px]"
              >
                <option value="all">Todos los estados</option>
                <option value="open">Abiertos</option>
                <option value="in_progress">En Progreso</option>
                <option value="resolved">Resueltos</option>
                <option value="closed">Cerrados</option>
              </select>
              <button
                onClick={() => setShowCreateTicket(true)}
                className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap"
              >
                Nuevo Ticket
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No hay tickets</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? 'Intenta ajustar tu búsqueda o filtros'
                  : 'Los tickets de soporte aparecerán aquí cuando sean creados'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button
                  onClick={() => setShowCreateTicket(true)}
                  className="mt-6 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium"
                >
                  Crear Ticket de Ejemplo
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)} whitespace-nowrap`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusIcon(ticket.status)}
                          <span className="text-sm text-gray-600 capitalize whitespace-nowrap">
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {new Date(ticket.createdAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-3 truncate">{ticket.title}</h4>
                      <p className="text-gray-600 mb-4 line-clamp-2 break-words">{ticket.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2 truncate">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Reportado por: {ticket.reportedBy.name}</span>
                        </div>
                        {ticket.studentAffected && (
                          <div className="flex items-center gap-2 truncate">
                            <BookOpen className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Alumno: {ticket.studentAffected.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-2 flex-shrink-0">
                      <button
                        onClick={() => setShowTicketModal(ticket)}
                        className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </button>
                      {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                        <button
                          onClick={() => setShowRespondTicket(ticket)}
                          className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium whitespace-nowrap"
                        >
                          <Reply className="w-4 h-4 mr-2" />
                          Responder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información del administrador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header - Mejorado para Web - CORREGIDO: Textos que no se salgan */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 min-w-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-xl flex-shrink-0">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">Panel de Administración</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Bienvenido,</span>
                  <span className="text-sm font-semibold text-blue-600 truncate">{user.username || user.email}</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium whitespace-nowrap">
                    Administrador
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Estadísticas rápidas en header para web */}
              <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-blue-600">{stats.totalMaestros}</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Maestros</div>
                </div>
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-green-600">{stats.totalAlumnos}</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Alumnos</div>
                </div>
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-yellow-600">{stats.ticketsAbiertos}</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Tickets</div>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowTour(true)}
                  className="flex items-center px-4 py-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md text-sm font-medium whitespace-nowrap"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Guía de Uso
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-5 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md text-sm font-medium border border-gray-300 whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
              >
                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Mejorado para Web - QUITADO: Estado del Sistema */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Dashboard</h2>
                <p className="text-sm text-gray-600">Gestiona todos los aspectos del sistema</p>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('maestros')}
                    className={`w-full flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      activeTab === 'maestros'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl transform -translate-y-0.5'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg mr-4 ${activeTab === 'maestros' ? 'bg-white/20' : 'bg-blue-100'}`}>
                      <Users className={`w-5 h-5 ${activeTab === 'maestros' ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <span className="font-semibold truncate">Maestros</span>
                    {activeTab === 'maestros' && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white/80 flex-shrink-0" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`w-full flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      activeTab === 'students'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl transform -translate-y-0.5'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg mr-4 ${activeTab === 'students' ? 'bg-white/20' : 'bg-green-100'}`}>
                      <BookOpen className={`w-5 h-5 ${activeTab === 'students' ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <span className="font-semibold truncate">Alumnos</span>
                    {activeTab === 'students' && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white/80 flex-shrink-0" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`w-full flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      activeTab === 'support'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl transform -translate-y-0.5'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg mr-4 ${activeTab === 'support' ? 'bg-white/20' : 'bg-purple-100'}`}>
                      <MessageSquare className={`w-5 h-5 ${activeTab === 'support' ? 'text-white' : 'text-purple-600'}`} />
                    </div>
                    <span className="font-semibold truncate">Soporte</span>
                    {ticketStats.open > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse whitespace-nowrap flex-shrink-0">
                        {ticketStats.open}
                      </span>
                    )}
                    {activeTab === 'support' && ticketStats.open === 0 && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white/80 flex-shrink-0" />
                    )}
                  </button>
                </li>
              </ul>
              
              {/* QUITADO: Sección de "Estado del Sistema" */}
              
            </nav>
            
            {/* Mobile logout button */}
            {isMobileMenuOpen && (
              <div className="sm:hidden mt-4 bg-white rounded-2xl shadow-xl p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium border border-gray-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Main Content Area - Ancho completo en web */}
          <div className="flex-1 min-w-0">
            {activeTab === 'maestros' && renderMaestros()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'support' && renderSupport()}
          </div>
        </div>
      </div>

      {/* Modals (se mantienen igual) */}
      {showChangePassword && (
        <ChangePasswordModal
          teacher={showChangePassword}
          onClose={() => setShowChangePassword(null)}
          onChangePassword={(id, newPassword) => {
            handleChangePassword(
              id, 
              newPassword, 
              'role' in showChangePassword && showChangePassword.role === 'maestro' ? 'maestro' : 'user'
            );
          }}
        />
      )}

      {showCreateTicket && (
        <CreateTicketModal
          teachers={maestros}
          students={students}
          onCreate={(ticket) => {
            const newTicket = {
              ...ticket,
              id: `ticket-${Date.now()}`,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            setTickets(prev => [...prev, newTicket]);
            setShowCreateTicket(false);
          }}
          onClose={() => setShowCreateTicket(false)}
        />
      )}

      {showTicketModal && (
        <SupportTicketModal
          ticket={showTicketModal}
          teachers={maestros}
          students={students}
          onUpdate={(ticketId, updates) => {
            setTickets(prev => prev.map(t => 
              t.id === ticketId ? { ...t, ...updates, updatedAt: new Date() } : t
            ));
          }}
          onClose={() => setShowTicketModal(null)}
        />
      )}

      {showRespondTicket && (
        <RespondTicketModal
          ticket={showRespondTicket}
          onRespond={handleRespondTicket}
          onClose={() => setShowRespondTicket(null)}
        />
      )}

      {showTour && (
        <TourGuide
          userRole="admin"
          onComplete={() => setShowTour(false)}
          onSkip={() => setShowTour(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;