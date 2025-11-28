import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
  icon?: LucideIcon;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  icon: Icon,
  isLoading = false,
}) => {
  const baseClasses = 'w-full py-4 px-4 rounded-xl hover:shadow-xl focus:ring-4 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:-translate-y-1 transform';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-300 focus:ring-cyan-500/50 shadow-cyan-500/50 hover:shadow-cyan-400/60 text-slate-900',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 border-2 border-slate-600 shadow-xl hover:shadow-2xl',
    danger: 'bg-gradient-to-r from-red-500 via-amber-500 to-red-400 hover:from-red-400 hover:via-amber-400 hover:to-red-300 focus:ring-red-500/50 shadow-red-500/50 hover:shadow-red-400/60 text-slate-900',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 focus:ring-4 focus:ring-emerald-500/50 border-2 border-emerald-600/50 text-white shadow-xl hover:shadow-2xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;