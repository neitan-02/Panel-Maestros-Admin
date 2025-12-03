import React, { useState } from 'react';
import { X, Key } from 'lucide-react';

interface ChangePasswordModalProps {
  teacher: any; // Puede ser Maestro o User
  onClose: () => void;
  onChangePassword: (id: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  teacher,
  onClose,
  onChangePassword
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword.trim()) {
      setError('La nueva contraseña es requerida');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      // Usar el ID correcto (_id del backend)
      const id = teacher._id || teacher.id;
      await onChangePassword(id, newPassword);
    } catch (error: any) {
      setError(error.message || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Key className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Cambiar Contraseña
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Usuario:</span> {teacher.username}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {teacher.email || 'No especificado'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Tipo:</span> {teacher.role === 'maestro' ? 'Maestro' : 'Estudiante'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Repite la contraseña"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cambiando...
                    </>
                  ) : (
                    'Cambiar Contraseña'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;