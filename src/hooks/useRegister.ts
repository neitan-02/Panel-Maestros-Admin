import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types/auth';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    cct: '',
    grado: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const gradeOptions = ['1A°', '1B°', '1C°'];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.cct.trim()) {
      newErrors.cct = 'La CCT es requerida';
    } else if (formData.cct.trim().length < 3) {
      newErrors.cct = 'La CCT debe tener al menos 3 caracteres';
    }

    if (!formData.grado) {
      newErrors.grado = 'Selecciona un grado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const registerData = {
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        cct: formData.cct.trim(),
        grado: formData.grado,
        role: 'maestro' as UserRole
      };

      const result = await register(registerData);
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 3000);
      }
    } catch (error: any) {
      if (error.message.includes('El usuario ya existe')) {
        setErrors({ submit: 'El correo electrónico ya está registrado. Intenta con otro correo.' });
      } else if (error.message.includes('Error de conexión')) {
        setErrors({ submit: 'Error de conexión con el servidor. Verifica tu internet.' });
      } else if (error.message.includes('Error en el servidor')) {
        setErrors({ submit: 'Error temporal en el servidor. Intenta nuevamente en unos minutos.' });
      } else {
        setErrors({ submit: error.message || 'Error al crear la cuenta. Intenta de nuevo.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && formData.username && formData.email) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.password && formData.confirmPassword) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const fillTestData = () => {
    setFormData({
      username: 'MaestroPrueba',
      email: 'maestro@escuela.edu',
      password: 'maestro123',
      confirmPassword: 'maestro123',
      cct: '09DPR1234X',
      grado: '1A°'
    });
    setErrors({});
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    errors,
    isLoading,
    currentStep,
    isSuccess,
    gradeOptions,
    setShowPassword,
    setShowConfirmPassword,
    setCurrentStep,
    setIsSuccess,
    handleSubmit,
    handleInputChange,
    nextStep,
    prevStep,
    fillTestData
  };
};