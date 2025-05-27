
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'steel-frame':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'drywall':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'madeira':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="w-full h-64">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-blueDark truncate flex-1">
            {project.title}
          </h3>
          <div className="flex gap-2 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(project)}
              className="h-8 w-8 text-blue-600 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(project.id)}
              className="h-8 w-8 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {project.location && (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 mb-2">
            {project.location}
          </Badge>
        )}

        {project.category && (
          <Badge className={`${getCategoryColor(project.category)} mb-3`}>
            {getCategoryLabel(project.category)}
          </Badge>
        )}

        {project.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} className="bg-orangeAccent/10 text-orangeAccent">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
