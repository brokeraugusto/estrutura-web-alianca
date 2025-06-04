import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
const Servicos: React.FC = () => {
  const services = [{
    id: 'drywall',
    title: 'Drywall',
    description: 'Paredes e forros em drywall com alta qualidade e acabamento impecável. Soluções para divisórias internas, revestimentos e forros com ótimo isolamento acústico e térmico.',
    features: ['Paredes internas e divisórias', 'Forros decorativos e rebaixos', 'Revestimentos acústicos', 'Sancas de iluminação e nichos', 'Tratamento de juntas e acabamento'],
    image: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 'steel-frame',
    title: 'Steel Frame',
    description: 'Estruturas em steel frame para construções completas ou modulares. Sistema construtivo ágil, durável e resistente à umidade, ideal para o clima litorâneo.',
    features: ['Construções completas', 'Ampliações e módulos', 'Estruturas para coberturas', 'Revestimentos externos', 'Projetos personalizados'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 'madeira',
    title: 'Projetos em Madeira',
    description: 'Decks, pergolados, chalés e coberturas em madeira tratada com acabamento de primeira qualidade. Soluções personalizadas que agregam beleza e funcionalidade.',
    features: ['Decks para áreas externas', 'Pergolados e coberturas', 'Chalés e cabanas', 'Estruturas para telhados', 'Revestimentos em madeira'],
    image: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }];
  return <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blueDark mb-8 text-center">Nossos Serviços</h1>
      
      {/* Intro */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <p className="text-lg text-gray-700">
          A Aliança Estruturas oferece soluções construtivas modernas, leves e eficientes para diferentes necessidades.
          Conheça nossos principais serviços e como podemos transformar seu projeto em realidade.
        </p>
      </div>

      {/* Serviços Detalhados */}
      <div className="space-y-24 mb-16">
        {services.map((service, index) => <div key={service.id} className="max-w-5xl mx-auto">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="md:w-1/2">
                <img src={service.image} alt={service.title} className="rounded-lg w-full h-80 object-cover shadow-lg" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-blueDark">{service.title}</h2>
                <p className="text-gray-700 mb-6">{service.description}</p>
                
                <h3 className="text-lg font-medium mb-3 text-blueDark">O que oferecemos:</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => <li key={idx} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-orangeAccent mr-2 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>)}
                </ul>
                
                <Link to="/contato">
                  <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                    Solicitar orçamento
                  </Button>
                </Link>
              </div>
            </div>
          </div>)}
      </div>

      {/* Metodologia de Trabalho */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-blueDark text-center">Nossa Metodologia de Trabalho</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[{
          title: 'Consultoria',
          description: 'Entendemos suas necessidades para oferecer a melhor solução',
          icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
        }, {
          title: 'Projeto',
          description: 'Desenvolvemos o projeto detalhado com todas as especificações',
          icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
        }, {
          title: 'Execução',
          description: 'Construção com equipe qualificada e materiais de qualidade',
          icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        }, {
          title: 'Entrega',
          description: 'Finalização com acabamento impecável e garantia de qualidade',
          icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
        }].map((step, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blueDark text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blueDark">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>)}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-blueDark to-[#0f2435] p-8 rounded-lg text-center text-white bg-blue-900">
        <h2 className="text-2xl font-semibold mb-4">Pronto para começar seu projeto?</h2>
        <p className="mb-6">
          Entre em contato conosco para uma consulta gratuita e descubra como podemos transformar sua visão em realidade.
        </p>
        <Link to="/contato">
          <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg my-0 py-0">
            Solicitar Orçamento
          </Button>
        </Link>
      </div>
    </div>;
};
export default Servicos;