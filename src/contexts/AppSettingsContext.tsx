
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logo?: string;
  favicon?: string;
}

const defaultSettings: AppSettings = {
  primaryColor: '#153957', // blueDark
  secondaryColor: '#ffffff', // white
  accentColor: '#FF6B35', // orangeAccent
  font: 'Inter, sans-serif'
};

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  loading: boolean;
  applySettings: (settings?: AppSettings) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Carregar configurações do banco de dados
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('*')
          .single();
        
        if (error) {
          console.error('Error loading app settings:', error);
          return;
        }
        
        if (data) {
          setSettings({
            ...defaultSettings,
            ...data,
          });
          applySettings(data);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    setLoading(true);
    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      // Verificar se existem configurações no banco
      const { data: existingSettings } = await supabase
        .from('app_settings')
        .select('*')
        .maybeSingle();
      
      let error;
      
      if (existingSettings) {
        const { error: updateError } = await supabase
          .from('app_settings')
          .update(updatedSettings)
          .eq('id', existingSettings.id);
          
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('app_settings')
          .insert([updatedSettings]);
          
        error = insertError;
      }
      
      if (error) {
        throw error;
      }
      
      setSettings(updatedSettings);
      applySettings(updatedSettings);
      toast.success('Configurações atualizadas com sucesso!');
    } catch (error: any) {
      toast.error(`Erro ao atualizar as configurações: ${error.message}`);
      console.error('Failed to update settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySettings = (settingsToApply: AppSettings = settings) => {
    // Aplicar as configurações ao CSS
    document.documentElement.style.setProperty('--color-primary', settingsToApply.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', settingsToApply.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', settingsToApply.accentColor);
    document.documentElement.style.setProperty('--font-family', settingsToApply.font);
    
    // Atualizar favicon se fornecido
    if (settingsToApply.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.setAttribute('rel', 'shortcut icon');
      link.setAttribute('href', settingsToApply.favicon);
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  const value = {
    settings,
    updateSettings,
    loading,
    applySettings
  };

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
}
