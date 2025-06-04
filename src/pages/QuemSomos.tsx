import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const QuemSomos: React.FC = () => {
  return <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blueDark mb-8 text-center">Quem Somos</h1>
      
      {/* História da empresa */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blueDark">Fundada em 2024, a Aliança Estruturas nasceu da paixão por construções eficientes e sustentáveis. Nosso time de profissionais qualificados se especializou em técnicas construtivas modernas que combinam rapidez, qualidade e baixo impacto ambiental.</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">Fundada em 2024, a Aliança Estruturas nasceu da paixão por construções eficientes e sustentáveis. Nosso time de profissionais qualificados se especializou em técnicas construtivas modernas que combinam rapidez, qualidade e baixo impacto ambiental.</p>
              <p className="text-gray-700">
                Atuando em Garopaba e região, nos destacamos por oferecer soluções construtivas 
                que atendem às necessidades específicas do clima litorâneo, com foco em durabilidade
                e eficiência.
              </p>
            </div>
            <div className="md:w-1/2">
              <img alt="Equipe Aliança Estruturas" className="rounded-lg w-full h-64 object-cover shadow-md" src="/lovable-uploads/d6f2b3ee-e4d4-4999-8a5e-d4c75ee6860e.jpg" />
            </div>
          </div>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blueDark text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blueDark text-center">Missão</h3>
            <p className="text-gray-600">
              Oferecer soluções construtivas inovadoras e sustentáveis que transformem ideias em realidade com agilidade e excelência.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blueDark text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blueDark text-center">Visão</h3>
            <p className="text-gray-600">
              Ser referência em construções leves e eficientes na região, reconhecida pela qualidade, inovação e compromisso com a sustentabilidade.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blueDark text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blueDark text-center">Valores</h3>
            <p className="text-gray-600">
              Compromisso com qualidade, transparência, sustentabilidade, inovação e respeito às necessidades específicas de cada cliente.
            </p>
          </div>
        </div>
      </div>

      {/* Equipe */}
      

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6 text-blueDark">Pronto para transformar seu projeto em realidade?</h2>
        <p className="text-gray-700 mb-8">
          Entre em contato conosco para uma consulta gratuita e descubra como podemos ajudar a realizar seu projeto.
        </p>
        <Link to="/contato">
          <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg py-0">
            Fale Conosco
          </Button>
        </Link>
      </div>
    </div>;
};
export default QuemSomos;