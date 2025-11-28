import React from 'react';
import { UserIcon, Mail } from 'lucide-react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

interface Step1PersonalInfoProps {
  formData: {
    username: string;
    email: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
  onNextStep: () => void;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
  formData,
  errors,
  onInputChange,
  onNextStep
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-black text-white mb-4">Información Personal</h3>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Nombre de Usuario
        </label>
        <Input
          type="text"
          value={formData.username}
          onChange={(e) => onInputChange('username', e.target.value)}
          placeholder="Tu nombre de usuario"
          required={true}
          icon={UserIcon}
          className={errors.username ? 'border-red-500/50 bg-red-500/10' : ''}
        />
        {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Correo Electrónico
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="correo@ejemplo.com"
          required={true}
          icon={Mail}
          className={errors.email ? 'border-red-500/50 bg-red-500/10' : ''}
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <Button
        type="button"
        onClick={onNextStep}
        disabled={!formData.username || !formData.email}
        variant="success"
      >
        Siguiente Paso
      </Button>
    </div>
  );
};

export default Step1PersonalInfo;