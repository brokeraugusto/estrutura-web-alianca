import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
const Projetos: React.FC = () => {
  const {
    projects,
    loading
  } = useProjects();
  const [activeFilter, setActiveFilter] = React.useState<string>('todos');
  const categories = [{
    id: 'todos',
    label: 'Todos os Projetos'
  }, {
    id: 'steel-frame',
    label: 'Steel Frame'
  }, {
    id: 'drywall',
    label: 'Drywall'
  }, {
    id: 'madeira',
    label: 'Madeira'
  }];
  const filteredProjects = activeFilter === 'todos' ? projects : projects.filter(project => project.category === activeFilter);
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'steel-frame':
        return 'Steel Frame';
      case 'drywall':
        return 'Drywall';
      case 'madeira':
        return 'Madeira';
      default:
        return category || 'Sem categoria';
    }
  };
  if (loading) {
    return <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blueDark" />
        </div>
      </div>;
  }
  return <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-blueDark mb-8 text-center">Nossos Projetos</h1>
      
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(category => <button key={category.id} onClick={() => setActiveFilter(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === category.id ? 'bg-blueDark text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {category.label}
          </button>)}
      </div>

      {/* Projetos */}
      {filteredProjects.length === 0 ? <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum projeto encontrado</p>
          <p className="text-gray-400 mt-2">
            {activeFilter === 'todos' ? 'Ainda não há projetos cadastrados' : 'Não há projetos nesta categoria'}
          </p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map(project => <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-full h-64">
                <AspectRatio ratio={4 / 3}>
                  {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Sem imagem</span>
                    </div>}
                </AspectRatio>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-blueDark">{project.title}</h3>
                  {project.location && <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {project.location}
                    </Badge>}
                </div>
                
                {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.category && <Badge className="bg-blueDark/10 text-blueDark">
                      {getCategoryLabel(project.category)}
                    </Badge>}
                  {project.tags && project.tags.map((tag, index) => <Badge key={index} className="bg-orangeAccent/10 text-orangeAccent">
                      {tag}
                    </Badge>)}
                </div>
              </div>
            </div>)}
        </div>}

      {/* Convite para novos projetos */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-blueDark to-[#0f2435] p-8 rounded-lg text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Tem um projeto em mente?</h2>
        <p className="mb-6">
          Estamos prontos para transformar sua visão em realidade com soluções inovadoras e eficientes.
          Entre em contato para uma consulta personalizada.
        </p>
        <Link to="/contato">
          <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white px-8 rounded-lg text-lg font-semibold inline-block transition-all duration-300 hover:scale-105 shadow-lg py-0">
            Iniciar Meu Projeto
          </Button>
        </Link>
      </div>
    </div>;
};
export default Projetos;