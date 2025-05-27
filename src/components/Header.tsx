
import React, { useState, useEffect } from 'react';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import LogoBrand from './header/LogoBrand';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenu from './header/MobileMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useAppSettings();

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
              <LogoBrand />
              <DesktopNavigation />
              <MobileMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Header;
