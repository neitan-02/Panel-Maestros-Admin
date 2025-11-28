import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LoginTabsProps {
  activeTab: 'teacher' | 'admin';
  onTabChange: (tab: 'teacher' | 'admin') => void;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-slate-700/50 rounded-xl p-1 mb-6 backdrop-blur-sm">
      <button
        onClick={() => onTabChange('teacher')}
        className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all ${
          activeTab === 'teacher'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
            : 'text-slate-400 hover:text-white hover:bg-slate-600/50'
        }`}
      >
        <GraduationCap className="w-5 h-5 mr-2" />
        Inicio de sesión
      </button>
    </div>
  );
};

export default LoginTabs;