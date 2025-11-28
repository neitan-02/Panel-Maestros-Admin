import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

const RegisterBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)', 
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Floating 3D Elements */}
      <div className="absolute top-20 right-20 animate-bounce animation-delay-1000">
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-4 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce animation-delay-2000">
        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default RegisterBackground;