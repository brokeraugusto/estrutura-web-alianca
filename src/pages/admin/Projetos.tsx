
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Loader2 } from 'lucide-react';
import { useProjects, Project } from '@/hooks/useProjects';
import ProjectForm from '@/components/admin/projects/ProjectForm';
import ProjectCard from '@/components/admin/projects/ProjectCard';

const Projetos: React.FC = () => {
  const { projects, loading, createProject, updateProject, deleteProject, uploadProjectImage } = useProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [uploading, setUploading] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateProject = async (data: Partial<Project>) => {
    await createProject(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateProject = async (data: Partial<Project>) => {
    if (editingProject) {
      await updateProject(editingProject.id, data);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = async () => {
    if (deletingProjectId) {
      await deleteProject(deletingProjectId);
      setDeletingProjectId(null);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      return await uploadProjectImage(file);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout activeTab="projetos">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blueDark" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="projetos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Projetos</h1>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Projeto</DialogTitle>
            </DialogHeader>
            <ProjectForm
              onSubmit={handleCreateProject}
              onCancel={() => setIsCreateDialogOpen(false)}
              uploading={uploading}
              onImageUpload={handleImageUpload}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Buscar projetos..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="steel-frame">Steel Frame</option>
              <option value="drywall">Drywall</option>
              <option value="madeira">Madeira</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Grid de projetos */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum projeto encontrado</p>
          <p className="text-gray-400 mt-2">
            {projects.length === 0 
              ? 'Comece criando seu primeiro projeto'
              : 'Tente ajustar os filtros de busca'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={setEditingProject}
              onDelete={setDeletingProjectId}
            />
          ))}
        </div>
      )}

      {/* Dialog de edição */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              project={editingProject}
              onSubmit={handleUpdateProject}
              onCancel={() => setEditingProject(null)}
              uploading={uploading}
              onImageUpload={handleImageUpload}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!deletingProjectId} onOpenChange={() => setDeletingProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir este projeto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProject}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Projetos;
