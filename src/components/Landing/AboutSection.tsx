import React from 'react';
import { CheckCircle, TrendingUp, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Acerca de
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Nosotros</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Pioneros en tecnología educativa, transformando
            la experiencia de aprendizaje con soluciones innovadoras
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Nuestra Misión</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Democratizar el acceso a herramientas educativas de calidad,
                empoderando a educadores y estudiantes con tecnología de vanguardia.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Nuestra Visión</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Ser la plataforma educativa líder que transforme la manera en que
                las instituciones gestionan y optimizan el proceso de enseñanza-aprendizaje.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Nuestros Valores</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Innovación, calidad, accesibilidad y compromiso con la excelencia educativa
                son los pilares que guían cada decisión y desarrollo.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-400 p-8 rounded-2xl shadow-2xl shadow-cyan-500/50">
            <h3 className="text-3xl font-black mb-6 text-slate-900">¿Por qué EduControl Pro?</h3>
            <div className="space-y-4">
              {[
                'Interfaz intuitiva y fácil de usar',
                'Reportes detallados y análisis avanzado',
                'Soporte técnico especializado 24/7',
                'Actualizaciones constantes y mejoras',
                'Seguridad de datos garantizada'
              ].map((item, index) => (
                <div key={index} className="flex items-center bg-slate-900/20 backdrop-blur-sm p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 mr-3 text-slate-900" />
                  <span className="font-bold text-slate-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;