
import React from 'react';
import { useAppSettings } from '@/contexts/AppSettingsContext';

interface SmartLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  alt?: string;
}

const SmartLogo: React.FC<SmartLogoProps> = ({ 
  variant = 'auto', 
  className = '',
  alt = 'Aliança Estruturas'
}) => {
  const { settings } = useAppSettings();

  const getLogoUrl = () => {
    if (variant === 'light') {
      return settings.logoLightUrl || settings.logoUrl || '/logo.svg';
    }
    if (variant === 'dark') {
      return settings.logoDarkUrl || settings.logoUrl || '/logo.svg';
    }
    // Auto: detecta o fundo baseado na classe CSS ou usa light como padrão
    return settings.logoLightUrl || settings.logoUrl || '/logo.svg';
  };

  return (
    <img 
      src={getLogoUrl()} 
      alt={alt}
      className={`h-8 w-auto ${className}`}
    />
  );
};

export default SmartLogo;
