
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

const Projetos: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('todos');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Residência Moderna',
      location: 'Garopaba, SC',
      description: 'Projeto de steel frame com acabamento em drywall e elementos em madeira para uma residência de praia.',
      category: 'steel-frame',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Residencial', 'Steel Frame', 'Drywall']
    },
    {
      id: 2,
      title: 'Deck para Restaurante',
      location: 'Imbituba, SC',
      description: 'Construção de deck em madeira tratada para área externa de restaurante à beira-mar.',
      category: 'madeira',
      image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Comercial', 'Deck', 'Madeira']
    },
    {
      id: 3,
      title: 'Home Office',
      location: 'Garopaba, SC',
      description: 'Projeto de home office com divisórias em drywall, nichos e iluminação personalizada.',
      category: 'drywall',
      image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Comercial', 'Drywall', 'Interiores']
    },
    {
      id: 4,
      title: 'Chalé de Montanha',
      location: 'Serra Catarinense',
      description: 'Construção de chalé em estrutura mista de madeira e steel frame com isolamento térmico.',
      category: 'madeira',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Residencial', 'Madeira', 'Steel Frame']
    },
    {
      id: 5,
      title: 'Loft Moderno',
      location: 'Florianópolis, SC',
      description: 'Reforma completa com drywall para criação de loft estilo industrial.',
      category: 'drywall',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Residencial', 'Drywall', 'Reforma']
    },
    {
      id: 6,
      title: 'Casa de Praia',
      location: 'Garopaba, SC',
      description: 'Construção residencial em steel frame com acabamentos modernos e sustentáveis.',
      category: 'steel-frame',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Residencial', 'Steel Frame']
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'steel-frame', label: 'Steel Frame' },
    { id: 'drywall', label: 'Drywall' },
    { id: 'madeira', label: 'Madeira' }
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blueDark mb-8 text-center">Nossos Projetos</h1>
      
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === category.id
                ? 'bg-blueDark text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-full h-64">
              <AspectRatio ratio={4/3}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-blueDark">{project.title}</h3>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {project.location}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <Badge key={index} className="bg-orangeAccent/10 text-orangeAccent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Convite para novos projetos */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-blueDark to-[#0f2435] p-8 rounded-lg text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Tem um projeto em mente?</h2>
        <p className="mb-6">
          Estamos prontos para transformar sua visão em realidade com soluções inovadoras e eficientes.
          Entre em contato para uma consulta personalizada.
        </p>
        <Link to="/contato">
          <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white py-3 px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg">
            Iniciar Meu Projeto
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Projetos;
