
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from '@/components/ui/button';
import SmartLogo from './SmartLogo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { settings } = useAppSettings();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fechar menu ao redimensionar tela
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`bg-white shadow-md fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
        style={{ borderBottomColor: settings.accentColor }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex justify-between items-center w-full max-w-6xl">
              <Link to="/" className="flex items-center flex-shrink-0">
                <SmartLogo variant="light" className="mr-2" />
                <span 
                  className="font-bold text-lg sm:text-xl tracking-tight truncate"
                  style={{ color: settings.primaryColor }}
                >
                  Aliança Estruturas
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                >
                  Início
                </Link>
                <Link 
                  to="/quem-somos" 
                  className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                >
                  Quem Somos
                </Link>
                <Link 
                  to="/servicos" 
                  className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                >
                  Serviços
                </Link>
                <Link 
                  to="/projetos" 
                  className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                >
                  Projetos
                </Link>
                <Link 
                  to="/contato" 
                  className="text-gray-700 transition-colors duration-300 font-medium whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                >
                  Contato
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-700 hover:bg-transparent flex-shrink-0"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = settings.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = '';
                  }}
                  onClick={() => navigate(user ? '/admin/dashboard' : '/login')}
                  title={user ? "Painel Admin" : "Login"}
                >
                  <User className="w-5 h-5" />
                </Button>
              </nav>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100"
                style={{ color: settings.primaryColor }}
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Navigation */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
              onClick={closeMenu}
              className="text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col p-4 space-y-4 flex-1">
            <Link 
              to="/" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = settings.accentColor;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '';
              }}
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link 
              to="/quem-somos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = settings.accentColor;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '';
              }}
              onClick={closeMenu}
            >
              Quem Somos
            </Link>
            <Link 
              to="/servicos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = settings.accentColor;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '';
              }}
              onClick={closeMenu}
            >
              Serviços
            </Link>
            <Link 
              to="/projetos" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = settings.accentColor;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '';
              }}
              onClick={closeMenu}
            >
              Projetos
            </Link>
            <Link 
              to="/contato" 
              className="text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = settings.accentColor;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '';
              }}
              onClick={closeMenu}
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
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.backgroundColor = settings.primaryColor;
                  target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.backgroundColor = '';
                  target.style.color = settings.primaryColor;
                }}
                onClick={() => {
                  navigate(user ? '/admin/dashboard' : '/login');
                  closeMenu();
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

export default Header;
