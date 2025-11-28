import React from 'react';
import { BookOpen, TrendingUp, Users, Award, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    TrendingUp,
    Users,
    Award
  };

  const IconComponent = iconMap[feature.icon] || BookOpen; 

  const colors = [
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-blue-500 to-cyan-500',
    'from-teal-500 to-emerald-500'
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-2 transform-gpu group">
      <div className={`bg-gradient-to-r ${colors[index]} p-4 rounded-xl w-fit mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;