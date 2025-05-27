
import { useState, useEffect } from 'react';
import { supabaseWrapper } from '@/lib/supabase-wrapper';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  title: string;
  location?: string;
  description?: string;
  category?: string;
  image_url?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabaseWrapper.client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar projetos",
        description: "Não foi possível carregar os projetos.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      const { data, error } = await supabaseWrapper.client
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => [data, ...prev]);
      toast({
        title: "Projeto criado",
        description: "O projeto foi criado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar projeto",
        description: "Não foi possível criar o projeto.",
      });
      throw error;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const { data, error } = await supabaseWrapper.client
        .from('projects')
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: "Projeto atualizado",
        description: "O projeto foi atualizado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar projeto",
        description: "Não foi possível atualizar o projeto.",
      });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabaseWrapper.client
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Projeto excluído",
        description: "O projeto foi excluído com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir projeto",
        description: "Não foi possível excluir o projeto.",
      });
      throw error;
    }
  };

  const uploadProjectImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabaseWrapper.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabaseWrapper.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer upload",
        description: "Não foi possível fazer upload da imagem.",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    refetch: fetchProjects
  };
};
