import React from 'react';
import { BookOpen, Users, Menu, X } from 'lucide-react';

interface NavigationProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onScrollToSection: (sectionId: string) => void;
  onAccessPanel: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  onMenuToggle,
  onScrollToSection,
  onAccessPanel
}) => {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-b border-slate-700 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl mr-3 shadow-xl transform hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                EduControl Pro
              </h1>
              <p className="text-xs text-slate-400 font-semibold">Sistema Educativo Integral</p>
            </div>
            
            <div className="ml-8 hidden lg:flex items-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-2xl mr-2 shadow-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  EduTech Solutions
                </p>
                <p className="text-xs text-slate-400 font-semibold">Innovación Educativa</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {['inicio', 'nosotros', 'equipo', 'contacto'].map((section) => (
              <button
                key={section}
                onClick={() => onScrollToSection(section)}
                className="text-slate-300 hover:text-cyan-400 transition-all duration-300 font-bold px-4 py-2 rounded-lg hover:bg-slate-800 relative group capitalize"
              >
                <span className="relative z-10">{section}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-lg transition-all duration-300"></div>
              </button>
            ))}
            <button
              onClick={onAccessPanel}
              className="ml-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-slate-900 px-7 py-3 rounded-xl hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-300 transition-all duration-300 shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-400/60 hover:-translate-y-1 font-black transform-gpu"
            >
              Acceder al Panel
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['inicio', 'nosotros', 'equipo', 'contacto'].map((section) => (
                <button
                  key={section}
                  onClick={() => onScrollToSection(section)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
              <button
                onClick={onAccessPanel}
                className="block w-full text-left px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium mt-2"
              >
                Acceder al Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;