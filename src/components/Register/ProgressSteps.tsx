import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
          currentStep >= 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-slate-700 text-slate-400'
        }`}>
          1
        </div>
        <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
          currentStep >= 2 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-700'
        }`}></div>
      </div>
      <div className="flex items-center gap-2 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
          currentStep >= 2 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-slate-700 text-slate-400'
        }`}>
          2
        </div>
        <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
          currentStep >= 3 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-700'
        }`}></div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
        currentStep >= 3 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-slate-700 text-slate-400'
      }`}>
        3
      </div>
    </div>
  );
};

export default ProgressSteps;