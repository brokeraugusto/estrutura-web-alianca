
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-blueDark text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdHxlbnwwfHx8fDE3NDc3NjM2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[80vh] sm:min-h-[85vh] flex items-center">
          <div className="w-full max-w-4xl mx-auto text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Tecnologia e eficiência em cada estrutura
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto sm:mx-0">
              Soluções construtivas leves em drywall, steel frame e madeira para Garopaba e região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link
                to="/contato"
                className="bg-orangeAccent hover:bg-[#ff9000] text-white py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                Solicite um orçamento
              </Link>
              <Link
                to="/projetos"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blueDark text-white py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 text-center"
              >
                Ver projetos
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={scrollToServices}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
        aria-label="Rolar para serviços"
      >
        <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </button>
    </section>
  );
};

export default HeroSection;
