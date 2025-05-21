
import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blueDark">
            Soluções construtivas modernas e eficientes
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            A Aliança Estruturas é especializada em soluções leves e ágeis para construção
            civil. Atendemos Garopaba e região com foco em qualidade, agilidade e acabamento
            impecável para todos os tipos de projetos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              }
              title="Drywall"
              description="Paredes, forros e revestimentos com acabamento perfeito, isolamento acústico
                e velocidade de execução."
            />
            <ServiceCard
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18v18H3zM3 9h18M9 21V9"
                  ></path>
                </svg>
              }
              title="Steel Frame"
              description="Construção ágil, durável e resistente à umidade. Ideal para o clima
                litorâneo, com maior eficiência térmica."
            />
            <ServiceCard
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              }
              title="Projetos em Madeira"
              description="Decks, pergolados, chalés e coberturas com beleza natural e tratamento para
                maior durabilidade em áreas litorâneas."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
