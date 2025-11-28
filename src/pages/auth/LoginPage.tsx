import React from 'react';
import { Mail, Lock} from 'lucide-react';
import { useLogin } from '../../hooks/useLogin';
import LoginBackground from '../../components/Login/LoginBackground';
import WelcomeSection from '../../components/Login/WelcomeSection';
import LoginTabs from '../../components/Login/LoginTabs';
import LoginHeader from '../../components/Login/LoginHeader';
import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

interface LoginPageProps {
  onShowRegister: () => void;
  onBackToLanding?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onShowRegister, onBackToLanding }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    activeTab,
    setActiveTab,
    handleSubmit
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <LoginBackground />
      
      <div className="max-w-5xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <WelcomeSection />

          {/* Right Side - Login Form */}
          <Card className="p-8" hoverEffect={true}>
            <LoginHeader onBackToLanding={onBackToLanding} />

            <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required={true}
                  icon={Mail}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Contraseña
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required={true}
                  icon={Lock}
                  showPasswordToggle={true}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                variant={activeTab === 'admin' ? 'danger' : 'primary'}
                isLoading={isLoading}
              >
                {`Iniciar Sesión como ${activeTab === 'admin' ? 'Administrador' : 'Maestro'}`}
              </Button>
            </form>

            {/* Mostrar sección de registro solo para maestros */}
            {activeTab === 'teacher' && (
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-4">¿No tienes cuenta como maestro?</p>
                  <Button
                    onClick={onShowRegister}
                    variant="success"
                  >
                    Registrarse como Maestro
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;