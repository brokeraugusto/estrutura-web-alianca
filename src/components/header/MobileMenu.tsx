
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { settings } = useAppSettings();
  const navigate = useNavigate();

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const target = e.currentTarget;
    target.style.color = enter ? settings.accentColor : '';
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    const target = e.currentTarget;
    if (enter) {
      target.style.backgroundColor = settings.primaryColor;
      target.style.color = 'white';
    } else {
      target.style.backgroundColor = '';
      target.style.color = settings.primaryColor;
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Navigation */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span 
              className="font-bold text-lg"
              style={{ color: settings.primaryColor }}
            >
              Menu
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col p-4 space-y-4 flex-1">
            <Link 
              to="/" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              onClick={onClose}
            >
              Início
            </Link>
            <Link 
              to="/quem-somos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              onClick={onClose}
            >
              Quem Somos
            </Link>
            <Link 
              to="/servicos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              onClick={onClose}
            >
              Serviços
            </Link>
            <Link 
              to="/projetos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              onClick={onClose}
            >
              Projetos
            </Link>
            <Link 
              to="/contato" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              onClick={onClose}
            >
              Contato
            </Link>
            
            <div className="border-t pt-4 mt-auto">
              <Button
                variant="outline"
                className="w-full justify-start transition-all duration-300"
                style={{ 
                  borderColor: settings.primaryColor,
                  color: settings.primaryColor
                }}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onClick={() => {
                  navigate(user ? '/admin/dashboard' : '/login');
                  onClose();
                }}
              >
                <User className="w-5 h-5 mr-2" />
                {user ? "Painel Admin" : "Login"}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
