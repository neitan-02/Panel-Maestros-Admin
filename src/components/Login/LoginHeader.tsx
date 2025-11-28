import React from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface LoginHeaderProps {
  onBackToLanding?: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ onBackToLanding }) => {
  return (
    <>
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 p-5 rounded-2xl shadow-2xl transform hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Panel Educativo</h1>
        <p className="text-slate-400">Selecciona tu tipo de acceso</p>
      </div>
    </>
  );
};

export default LoginHeader;