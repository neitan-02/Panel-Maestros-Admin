import React from 'react';
import { Check } from 'lucide-react';
import Card from '../UI/Card/Card';

const SuccessScreen: React.FC = () => {
  return (
    <div className="max-w-md w-full relative z-10">
      <Card className="p-8 text-center">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">¡Registro Exitoso!</h2>
        <p className="text-slate-300 mb-6">Tu cuenta ha sido creada correctamente. Serás redirigido al dashboard.</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
      </Card>
    </div>
  );
};

export default SuccessScreen;