
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string;
  faviconUrl?: string;
}

const defaultSettings: AppSettings = {
  primaryColor: '#15394f', // blueDark
  secondaryColor: '#ef4444', // red
  accentColor: '#3b82f6', // blue
  font: 'font-body',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico'
};

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  uploadLogo: (file: File) => void;
  uploadFavicon: (file: File) => void;
  uploading: boolean;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Carrega as configurações iniciais
  useEffect(() => {
    loadSettings();
  }, []);
  
  // Primeiro tenta carregar do localStorage (para uso imediato)
  const loadSettings = async () => {
    const savedSettings = localStorage.getItem('appSettings');
    
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Erro ao carregar configurações do localStorage:', error);
      }
    }
    
    // Depois tenta buscar do banco de dados (versão mais atualizada)
    try {
      // Usando RPC customizada ou query genérica para verificar se a tabela existe
      // sem depender de tipos específicos do banco de dados
      const { data, error } = await supabase.rpc('check_if_table_exists', { table_name: 'app_settings' });
      const tableExists = data || false;
      
      if (tableExists && !error) {
        // A tabela existe, buscar dados usando query() para evitar tipagem estrita
        const { data: settingsData, error: fetchError } = await supabase
          .from('app_settings')
          .select('*')
          .maybeSingle();
        
        if (fetchError) {
          throw fetchError;
        }
        
        if (settingsData) {
          const dbSettings = settingsData as unknown as AppSettings;
          setSettings(dbSettings);
          localStorage.setItem('appSettings', JSON.stringify(dbSettings));
        }
      } else {
        // A tabela não existe, usando apenas as configurações padrão ou do localStorage
        console.log('Tabela app_settings não encontrada, usando configurações padrão');
      }
    } catch (error) {
      console.error('Erro ao carregar configurações do banco de dados:', error);
    }
  };

  const updateSettings = async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
      
      // Verificar se a tabela app_settings existe
      const { data, error } = await supabase.rpc('check_if_table_exists', { table_name: 'app_settings' });
      const tableExists = data || false;
      
      if (tableExists && !error) {
        // Se a tabela existir, atualiza usando query() para evitar tipagem estrita
        const updateResult = await supabase
          .from('app_settings')
          .update(newSettings as any)
          .eq('id', 1);
          
        if (updateResult.error) throw updateResult.error;
      }
      
      toast({
        title: "Configurações atualizadas",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar configurações",
        description: "Ocorreu um erro ao tentar salvar as configurações.",
      });
    }
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(`logos/${fileName}`, file);
        
      if (uploadError) throw uploadError;
      
      // Construindo a URL manualmente para evitar dependências de tipos
      const storageUrl = process.env.SUPABASE_URL || '';
      const url = `${storageUrl}/storage/v1/object/public/media/logos/${fileName}`;
      
      updateSettings({ ...settings, logoUrl: url });
      
      toast({
        title: "Logo atualizado",
        description: "O novo logo foi carregado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao fazer upload do logo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar logo",
        description: "Ocorreu um erro ao tentar carregar o logo.",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const uploadFavicon = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(`favicons/${fileName}`, file);
        
      if (uploadError) throw uploadError;
      
      // Construindo a URL manualmente para evitar dependências de tipos
      const storageUrl = process.env.SUPABASE_URL || '';
      const url = `${storageUrl}/storage/v1/object/public/media/favicons/${fileName}`;
      
      updateSettings({ ...settings, faviconUrl: url });
      
      // Update favicon link in document head
      const linkElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (linkElement) {
        linkElement.href = url;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = url;
        document.head.appendChild(newLink);
      }
      
      toast({
        title: "Favicon atualizado",
        description: "O novo favicon foi carregado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao fazer upload do favicon:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar favicon",
        description: "Ocorreu um erro ao tentar carregar o favicon.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppSettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      uploadLogo,
      uploadFavicon,
      uploading
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextType => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
