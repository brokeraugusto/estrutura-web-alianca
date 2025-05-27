
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import SmartLogo from '../SmartLogo';

const LogoBrand: React.FC = () => {
  const { settings } = useAppSettings();

  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <SmartLogo variant="light" className="mr-2" />
      <span 
        className="font-bold text-lg sm:text-xl tracking-tight truncate"
        style={{ color: settings.primaryColor }}
      >
        Aliança Estruturas
      </span>
    </Link>
  );
};

export default LogoBrand;
