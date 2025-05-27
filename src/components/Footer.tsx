
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SmartLogo from './SmartLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blueDark text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <SmartLogo variant="dark" className="mr-2" />
              <span className="font-bold text-lg sm:text-xl tracking-tight">Aliança Estruturas</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              Soluções construtivas leves em drywall, steel frame e madeira para Garopaba e
              região.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-orangeAccent transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-white hover:text-orangeAccent transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.16 8.64C16.14 9.98 16.06 11.31 16.03 12.65C15.97 14.08 15.9 15.51 15.78 16.94C15.76 17.19 15.64 17.42 15.47 17.59C15.16 17.87 14.77 18.06 14.36 18.11C13.13 18.3 11.88 18.41 10.65 18.5C9.64 18.56 8.62 18.59 7.6 18.56C7.29 18.55 6.97 18.47 6.67 18.31C6.28 18.11 6 17.77 5.89 17.36C5.83 17.14 5.79 16.91 5.77 16.68C5.56 14.91 5.44 13.13 5.4 11.34C5.38 10.13 5.42 8.91 5.47 7.69C5.5 7.03 5.66 6.39 5.94 5.79C6.04 5.57 6.21 5.4 6.42 5.28C6.63 5.17 6.87 5.12 7.12 5.13C9.62 5.16 12.11 5.25 14.61 5.34C14.89 5.36 15.17 5.42 15.43 5.52C15.95 5.74 16.17 6.16 16.18 6.69C16.23 7.34 16.18 7.99 16.16 8.64Z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-white hover:text-orangeAccent transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orangeAccent">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orangeAccent">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Drywall
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Steel Frame
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Decks e Pergolados
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Chalés
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base">
                  Coberturas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orangeAccent">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 mr-2 text-orangeAccent flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">Garopaba, SC</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-1 mr-2 text-orangeAccent flex-shrink-0" />
                <a 
                  href="tel:+5548988196062" 
                  className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base"
                >
                  (48) 9 8819-6062
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-1 mr-2 text-orangeAccent flex-shrink-0" />
                <a 
                  href="mailto:contato@aliancaestruturas.com.br" 
                  className="text-gray-300 hover:text-orangeAccent transition-colors duration-300 text-sm sm:text-base break-all"
                >
                  contato@aliancaestruturas.com.br
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mt-1 mr-2 text-orangeAccent flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">Seg-Sex: 8h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-10 pt-6 text-center text-gray-400">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Aliança Estruturas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
