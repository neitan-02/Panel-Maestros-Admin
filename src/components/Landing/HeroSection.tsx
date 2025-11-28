import React from 'react';
import { BookOpen, Users, Star, ArrowRight, ChevronRight } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface HeroSectionProps {
  onAccessPanel: () => void;
  onScrollToSection: (sectionId: string) => void;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onAccessPanel,
  onScrollToSection,
  features
}) => {
  return (
    <section id="inicio" className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-10">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-slate-900 rounded-full text-base font-black mb-8 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/60 hover:scale-105 transition-all duration-300 border-2 border-cyan-300">
              <Star className="w-6 h-6 mr-3" />
              Sistema Educativo Profesional
              <Star className="w-6 h-6 ml-3" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Transforma tu
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Gestión Educativa</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Plataforma integral para gestión académica, análisis de progreso
            <span className="block mt-3 text-cyan-400 font-bold">y reportes profesionales en un solo sistema</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={onAccessPanel}
              className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-slate-900 px-12 py-6 rounded-2xl hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-300 transition-all duration-300 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70 hover:-translate-y-2 hover:scale-105 font-black text-xl flex items-center transform-gpu group"
            >
              <BookOpen className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span>Comenzar Ahora</span>
              <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onScrollToSection('nosotros')}
              className="relative bg-slate-800 text-slate-200 px-12 py-6 rounded-2xl hover:bg-slate-700 transition-all duration-300 shadow-2xl hover:shadow-slate-600/50 hover:-translate-y-2 hover:scale-105 font-black text-xl flex items-center transform-gpu group border-2 border-slate-700"
            >
              <Users className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span>Conocer Más</span>
              <ChevronRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;