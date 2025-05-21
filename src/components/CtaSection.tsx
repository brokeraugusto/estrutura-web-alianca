
import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blueDark to-[#0f2435]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Transforme seu projeto em realidade</h2>
          <p className="text-lg mb-8 opacity-90">
            Estamos prontos para tornar sua ideia em um projeto executável com agilidade,
            qualidade e acabamento impecável.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/projetos"
              className="bg-white text-blueDark hover:bg-gray-100 py-3 px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver projetos
            </Link>
            <Link
              to="/contato"
              className="bg-orangeAccent hover:bg-[#ff9000] text-white py-3 px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Solicitar orçamento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
