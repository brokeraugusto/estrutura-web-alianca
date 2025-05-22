
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppSettings, defaultSettings } from '@/types/appSettings';
import { loadAppSettings, saveAppSettings, uploadMedia } from '@/services/appSettingsService';

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

  // Load initial settings
  useEffect(() => {
    async function initialize() {
      const appSettings = await loadAppSettings();
      setSettings(appSettings);
    }
    
    initialize();
  }, []);

  const updateSettings = async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      
      const success = await saveAppSettings(newSettings);
      
      if (success) {
        toast({
          title: "Configurações atualizadas",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        throw new Error("Falha ao salvar configurações");
      }
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
      const url = await uploadMedia(file, 'logos');
      
      if (url) {
        updateSettings({ ...settings, logoUrl: url });
        
        toast({
          title: "Logo atualizado",
          description: "O novo logo foi carregado com sucesso.",
        });
      } else {
        throw new Error("Falha ao fazer upload do logo");
      }
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
      const url = await uploadMedia(file, 'favicons');
      
      if (url) {
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
      } else {
        throw new Error("Falha ao fazer upload do favicon");
      }
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
