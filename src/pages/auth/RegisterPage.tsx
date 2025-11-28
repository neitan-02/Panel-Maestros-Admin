import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useRegister } from '../../hooks/useRegister';
import RegisterBackground from '../../components/Register/RegisterBackground';
import RegisterHeader from '../../components/Register/RegisterHeader';
import ProgressSteps from '../../components/Register/ProgressSteps';
import Step1PersonalInfo from '../../components/Register/Step1PersonalInfo';
import Step2Security from '../../components/Register/Step2Security';
import Step3SchoolInfo from '../../components/Register/Step3SchoolInfo';
import SuccessScreen from '../../components/Register/SuccessScreen';
import Card from '../../components/UI/Card/Card';

interface RegisterPageProps {
  onBackToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBackToLogin }) => {
  const {
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
    handleSubmit,
    handleInputChange,
    nextStep,
    prevStep,
    fillTestData
  } = useRegister();

  // Pantalla de éxito
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <RegisterBackground />
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <RegisterBackground />
      
      <div className="max-w-2xl w-full relative z-10">
        <Card className="p-8" hoverEffect={true}>
          <RegisterHeader onBackToLogin={onBackToLogin} onFillTestData={fillTestData} />

          <ProgressSteps currentStep={currentStep} />

          {/* Mensaje de error general */}
          {errors.submit && (
            <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <Step1PersonalInfo
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onNextStep={nextStep}
              />
            )}

            {/* Step 2: Security */}
            {currentStep === 2 && (
              <Step2Security
                formData={formData}
                errors={errors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                onPrevStep={prevStep}
                onNextStep={nextStep}
              />
            )}

            {/* Step 3: School Info */}
            {currentStep === 3 && (
              <Step3SchoolInfo
                formData={formData}
                errors={errors}
                gradeOptions={gradeOptions}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onPrevStep={prevStep}
                onSubmit={handleSubmit}
              />
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;