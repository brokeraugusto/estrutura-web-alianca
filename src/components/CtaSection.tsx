import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSettings } from '@/contexts/AppSettingsContext';
const CtaSection: React.FC = () => {
  const {
    settings
  } = useAppSettings();
  return <section style={{
    background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.primaryColor}dd)`
  }} className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-blue-950">
            Transforme seu projeto em realidade
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed text-blue-950">
            Estamos prontos para tornar sua ideia em um projeto executável com agilidade,
            qualidade e acabamento impecável.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
            <Link to="/projetos" className="bg-white py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg text-center hover:bg-gray-50" style={{
            color: settings.primaryColor
          }}>
              Ver projetos
            </Link>
            <Link to="/contato" className="text-white py-3 px-6 sm:px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg text-center hover:opacity-90" style={{
            backgroundColor: settings.accentColor
          }}>
              Solicitar orçamento
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default CtaSection;