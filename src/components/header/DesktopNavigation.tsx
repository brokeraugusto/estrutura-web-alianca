
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from '@/components/ui/button';

const DesktopNavigation: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useAppSettings();
  const navigate = useNavigate();

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const target = e.currentTarget;
    target.style.color = enter ? settings.accentColor : '';
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    const target = e.currentTarget;
    target.style.color = enter ? settings.accentColor : '';
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/" 
        className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
        onMouseEnter={(e) => handleLinkHover(e, true)}
        onMouseLeave={(e) => handleLinkHover(e, false)}
      >
        Início
      </Link>
      <Link 
        to="/quem-somos" 
        className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
        onMouseEnter={(e) => handleLinkHover(e, true)}
        onMouseLeave={(e) => handleLinkHover(e, false)}
      >
        Quem Somos
      </Link>
      <Link 
        to="/servicos" 
        className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
        onMouseEnter={(e) => handleLinkHover(e, true)}
        onMouseLeave={(e) => handleLinkHover(e, false)}
      >
        Serviços
      </Link>
      <Link 
        to="/projetos" 
        className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
        onMouseEnter={(e) => handleLinkHover(e, true)}
        onMouseLeave={(e) => handleLinkHover(e, false)}
      >
        Projetos
      </Link>
      <Link 
        to="/contato" 
        className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
        onMouseEnter={(e) => handleLinkHover(e, true)}
        onMouseLeave={(e) => handleLinkHover(e, false)}
      >
        Contato
      </Link>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="text-gray-700 hover:bg-transparent flex-shrink-0"
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
        onClick={() => navigate(user ? '/admin/dashboard' : '/login')}
        title={user ? "Painel Admin" : "Login"}
      >
        <User className="w-5 h-5" />
      </Button>
    </nav>
  );
};

export default DesktopNavigation;
