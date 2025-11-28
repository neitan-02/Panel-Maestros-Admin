import React from 'react';
import { Building, GraduationCap, Check } from 'lucide-react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

interface Step3SchoolInfoProps {
  formData: {
    cct: string;
    grado: string;
  };
  errors: Record<string, string>;
  gradeOptions: string[];
  isLoading: boolean;
  onInputChange: (field: string, value: string) => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Step3SchoolInfo: React.FC<Step3SchoolInfoProps> = ({
  formData,
  errors,
  gradeOptions,
  isLoading,
  onInputChange,
  onPrevStep,
  onSubmit
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-black text-white mb-4">Información Escolar</h3>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          CCT (Clave del Centro de Trabajo)
        </label>
        <Input
          type="text"
          value={formData.cct}
          onChange={(e) => onInputChange('cct', e.target.value)}
          placeholder="Ej: 09DPR1234X"
          required={true}
          icon={Building}
          className={errors.cct ? 'border-red-500/50 bg-red-500/10' : ''}
        />
        {errors.cct && <p className="mt-1 text-sm text-red-400">{errors.cct}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Grado de Primaria
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <select
            value={formData.grado}
            onChange={(e) => onInputChange('grado', e.target.value)}
            className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-white ${
              errors.grado ? 'border-red-500/50 bg-red-500/10' : 'border-slate-600'
            }`}
          >
            <option value="" className="bg-slate-900">Selecciona un grado</option>
            {gradeOptions.map(grade => (
              <option key={grade} value={grade} className="bg-slate-900">{grade}</option>
            ))}
          </select>
        </div>
        {errors.grado && <p className="mt-1 text-sm text-red-400">{errors.grado}</p>}
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
          type="submit"
          disabled={isLoading}
          variant="success"
          className="flex-1"
          isLoading={isLoading}
          icon={Check}
        >
          Crear Cuenta
        </Button>
      </div>
    </div>
  );
};

export default Step3SchoolInfo;