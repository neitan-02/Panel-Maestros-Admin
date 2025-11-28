import React from 'react';
import { BookOpen, GraduationCap, Users, Sparkles } from 'lucide-react';
import Card from '../UI/Card/Card';

const WelcomeSection: React.FC = () => {
  return (
    <div className="hidden lg:block text-white space-y-6">
      <Card className="p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-2xl shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Bienvenido
          </h2>
        </div>
        <p className="text-xl text-slate-300 mb-6 leading-relaxed">
          Accede a tu panel educativo profesional y gestiona tu clase de manera eficiente
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-xl">
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-slate-300">Gestión académica completa</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-xl">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-slate-300">Seguimiento de progreso en tiempo real</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-xl">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-slate-300">Reportes profesionales automatizados</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeSection;