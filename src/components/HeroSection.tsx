
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-blueDark text-white overflow-hidden h-[80vh]">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdHxlbnwwfHx8fDE3NDc3NjM2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      ></div>
      <div className="container mx-auto px-4 py-24 relative z-10 flex items-center h-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Tecnologia e eficiência em cada estrutura
          </h1>
          <p className="text-xl mb-8">
            Soluções construtivas leves em drywall, steel frame e madeira para Garopaba e região.
          </p>
          <Link
            to="/contato"
            className="bg-orangeAccent hover:bg-[#ff9000] text-white py-3 px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Solicite um orçamento
          </Link>
        </div>
      </div>
      <button 
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ChevronDown className="w-10 h-10 text-white" />
      </button>
    </section>
  );
};

export default HeroSection;
