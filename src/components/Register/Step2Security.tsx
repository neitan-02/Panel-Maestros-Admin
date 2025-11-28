import React from 'react';
import { Lock } from 'lucide-react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

interface Step2SecurityProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: string, value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const Step2Security: React.FC<Step2SecurityProps> = ({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onPrevStep,
  onNextStep
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-black text-white mb-4">Seguridad</h3>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Contraseña
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          placeholder="••••••••"
          required={true}
          icon={Lock}
          showPasswordToggle={true}
          onTogglePassword={onTogglePassword}
          showPassword={showPassword}
          className={errors.password ? 'border-red-500/50 bg-red-500/10' : ''}
        />
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Confirmar Contraseña
        </label>
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          placeholder="••••••••"
          required={true}
          icon={Lock}
          showPasswordToggle={true}
          onTogglePassword={onToggleConfirmPassword}
          showPassword={showConfirmPassword}
          className={errors.confirmPassword ? 'border-red-500/50 bg-red-500/10' : ''}
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={onPrevStep}
          variant="secondary"
          className="flex-1"
        >
          Atrás
        </Button>
        <Button
          type="button"
          onClick={onNextStep}
          disabled={!formData.password || !formData.confirmPassword}
          variant="success"
          className="flex-1"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Step2Security;