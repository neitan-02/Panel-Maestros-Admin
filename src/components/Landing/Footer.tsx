import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl mr-3 shadow-xl">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">EduControl Pro</h3>
          </div>
          <p className="text-slate-400 mb-6 font-semibold">
            Transformando la educación con tecnología de vanguardia
          </p>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-slate-500 font-medium">
              © 2024 EduControl Pro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;