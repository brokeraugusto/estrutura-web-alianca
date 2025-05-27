
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppSettings, defaultSettings } from '@/types/appSettings';
import { loadAppSettings, saveAppSettings, uploadMedia } from '@/services/appSettingsService';

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  uploadLogo: (file: File, type: 'light' | 'dark') => void;
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
      
      // Apply favicon dynamically
      updateFavicon(appSettings.faviconUrl);
      
      // Apply CSS variables for colors
      applyCSSVariables(appSettings);
    }
    
    initialize();
  }, []);

  const updateFavicon = (faviconUrl?: string) => {
    if (!faviconUrl) return;
    
    const linkElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = faviconUrl;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = faviconUrl;
      document.head.appendChild(newLink);
    }
  };

  const applyCSSVariables = (settings: AppSettings) => {
    const root = document.documentElement;
    
    // Convert hex to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHsl(settings.primaryColor));
    root.style.setProperty('--secondary', hexToHsl(settings.secondaryColor));
    root.style.setProperty('--accent', hexToHsl(settings.accentColor));
    
    // Apply font class to body
    document.body.className = `${settings.font} overflow-x-hidden`;
  };

  const updateSettings = async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      
      const success = await saveAppSettings(newSettings);
      
      if (success) {
        // Apply changes immediately
        updateFavicon(newSettings.faviconUrl);
        applyCSSVariables(newSettings);
        
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

  const uploadLogo = async (file: File, type: 'light' | 'dark') => {
    setUploading(true);
    try {
      const folder = type === 'light' ? 'logos-light' : 'logos-dark';
      const url = await uploadMedia(file, folder);
      
      if (url) {
        const updatedSettings = { 
          ...settings, 
          [type === 'light' ? 'logoLightUrl' : 'logoDarkUrl']: url 
        };
        
        updateSettings(updatedSettings);
        
        toast({
          title: `Logo ${type === 'light' ? 'claro' : 'escuro'} atualizado`,
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
