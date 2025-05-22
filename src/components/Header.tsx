
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-white shadow-md fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <svg className="w-10 h-10 mr-2 text-blueDark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
          </svg>
          <span className="text-blueDark font-bold text-xl tracking-tight">Aliança Estruturas</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium">
            Início
          </Link>
          <Link to="/quem-somos" className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium">
            Quem Somos
          </Link>
          <Link to="/servicos" className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium">
            Serviços
          </Link>
          <Link to="/projetos" className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium">
            Projetos
          </Link>
          <Link to="/contato" className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium">
            Contato
          </Link>
          
          {user ? (
            <Button 
              variant="outline" 
              className="flex items-center text-blueDark border-blueDark hover:bg-blueDark hover:text-white"
              onClick={() => navigate('/admin/dashboard')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Painel
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center text-blueDark border-blueDark hover:bg-blueDark hover:text-white"
              onClick={() => navigate('/login')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </div>
        
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="focus:outline-none">
            <Menu className="w-6 h-6 text-blueDark" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/quem-somos" 
                  className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quem Somos
                </Link>
                <Link 
                  to="/servicos" 
                  className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link 
                  to="/projetos" 
                  className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projetos
                </Link>
                <Link 
                  to="/contato" 
                  className="text-gray-700 hover:text-orangeAccent transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
                {user ? (
                  <Link
                    to="/admin/dashboard"
                    className="text-blueDark font-medium hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Painel Admin
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-blueDark font-medium hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
