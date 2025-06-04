import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useAppSettings } from '@/contexts/AppSettingsContext';
const HeroSection: React.FC = () => {
  const {
    settings
  } = useAppSettings();
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative text-white overflow-hidden" style={{
    backgroundColor: settings.primaryColor
  }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Background image - Construction/coastal theme for Garopaba */}
      <div style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
    }} className="absolute inset-0 bg-cover bg-center bg-no-repeat bg bg-blue-950/85"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg bg-sky-950/0">
        <div className="min-h-[80vh] sm:min-h-[85vh] flex items-center">
          <div className="w-full max-w-4xl mx-auto text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-blue-950 lg:text-6xl">
              Tecnologia e eficiência em cada estrutura
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto sm:mx-0 text-blue-950 text-left md:text-2xl font-normal px-0">
              Soluções construtivas leves em drywall, steel frame e madeira para Garopaba e região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/contato" style={{
              backgroundColor: settings.accentColor
            }} className="bg-amber-500 text-white py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg text-center hover:opacity-90">
                Solicite um orçamento
              </Link>
              <Link to="/projetos" className="bg-transparent border-2 border-white hover:bg-white text-white hover:text-current py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 text-center" style={{
              '--hover-text-color': settings.primaryColor
            } as React.CSSProperties} onMouseEnter={e => {
              const target = e.currentTarget as HTMLElement;
              target.style.color = settings.primaryColor;
            }} onMouseLeave={e => {
              const target = e.currentTarget as HTMLElement;
              target.style.color = 'white';
            }}>
                Ver projetos
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button onClick={scrollToServices} className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300" aria-label="Rolar para serviços">
        <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </button>
    </section>;
};
export default HeroSection;