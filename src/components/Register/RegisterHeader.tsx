import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface RegisterHeaderProps {
  onBackToLogin: () => void;
  onFillTestData: () => void;
}

const RegisterHeader: React.FC<RegisterHeaderProps> = ({ onBackToLogin, onFillTestData }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <button
          onClick={onBackToLogin}
          className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded-xl transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl shadow-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white">Registro de Maestro</h1>
          </div>
          <p className="text-slate-400 ml-1">Crea tu cuenta en 3 pasos simples</p>
        </div>
      </div>
      
      {/* Botón para datos de prueba */}
      <button
        onClick={onFillTestData}
        className="text-xs bg-slate-700 text-slate-300 px-3 py-2 rounded-lg hover:bg-slate-600 transition-colors border border-slate-600"
        title="Llenar con datos de prueba"
      >
        Datos Test
      </button>
    </div>
  );
};

export default RegisterHeader;