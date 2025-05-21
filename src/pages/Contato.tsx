
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contato: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementado o envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blueDark mb-8 text-center">Entre em Contato</h1>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Informações de contato */}
          <div className="lg:w-2/5">
            <div className="bg-blueDark text-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-orangeAccent flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">Endereço</span>
                    <address className="not-italic text-gray-300">
                      Av. Principal, 1234<br />
                      Centro, Garopaba - SC<br />
                      CEP: 88495-000
                    </address>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-orangeAccent flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">Telefone</span>
                    <a href="tel:+5548000000000" className="text-gray-300 hover:text-orangeAccent transition-colors">
                      (48) 9 0000-0000
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 text-orangeAccent flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">E-mail</span>
                    <a href="mailto:contato@aliancaestruturas.com.br" className="text-gray-300 hover:text-orangeAccent transition-colors">
                      contato@aliancaestruturas.com.br
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Clock className="w-6 h-6 mr-4 text-orangeAccent flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">Horário de Atendimento</span>
                    <p className="text-gray-300">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábados: 9h às 12h
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Nossas Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-orangeAccent transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-orangeAccent transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.16 8.64C16.14 9.98 16.06 11.31 16.03 12.65C15.97 14.08 15.9 15.51 15.78 16.94C15.76 17.19 15.64 17.42 15.47 17.59C15.16 17.87 14.77 18.06 14.36 18.11C13.13 18.3 11.88 18.41 10.65 18.5C9.64 18.56 8.62 18.59 7.6 18.56C7.29 18.55 6.97 18.47 6.67 18.31C6.28 18.11 6 17.77 5.89 17.36C5.83 17.14 5.79 16.91 5.77 16.68C5.56 14.91 5.44 13.13 5.4 11.34C5.38 10.13 5.42 8.91 5.47 7.69C5.5 7.03 5.66 6.39 5.94 5.79C6.04 5.57 6.21 5.4 6.42 5.28C6.63 5.17 6.87 5.12 7.12 5.13C9.62 5.16 12.11 5.25 14.61 5.34C14.89 5.36 15.17 5.42 15.43 5.52C15.95 5.74 16.17 6.16 16.18 6.69C16.23 7.34 16.18 7.99 16.16 8.64Z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-orangeAccent transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulário de contato */}
          <div className="lg:w-3/5">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-blueDark">Envie sua mensagem</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 mb-2 block">
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700 mb-2 block">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu-email@exemplo.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(XX) X XXXX-XXXX"
                    className="w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="subject" className="text-gray-700 mb-2 block">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Assunto da mensagem"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message" className="text-gray-700 mb-2 block">
                    Mensagem
                  </Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Descreva seu projeto ou dúvida..."
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-orangeAccent hover:bg-[#ff9000] text-white w-full py-3 rounded-lg font-medium text-lg transition-all duration-300"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-blueDark text-center">Nossa Localização</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            {/* Aqui seria inserido um iframe de mapa real */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>Mapa de localização seria exibido aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
