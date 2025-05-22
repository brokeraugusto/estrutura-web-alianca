
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

const APP_SETTINGS_KEY = 'app_settings';

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load settings from localStorage or database
  useEffect(() => {
    async function loadSettings() {
      try {
        // First, try to get from localStorage
        const localSettings = localStorage.getItem(APP_SETTINGS_KEY);
        if (localSettings) {
          const parsedSettings = JSON.parse(localSettings) as AppSettings;
          setSettings({...defaultSettings, ...parsedSettings});
          applySettings(parsedSettings);
          setLoading(false);
          return;
        }

        // Then try to fetch from database
        try {
          // Check if the table exists by running a query with maybeSingle instead of single
          const { data, error } = await supabase
            .from('app_settings')
            .select('*')
            .maybeSingle();
          
          if (data) {
            const appSettings = data as unknown as AppSettings;
            setSettings({
              ...defaultSettings,
              ...appSettings,
            });
            applySettings(appSettings);
          }
        } catch (dbError) {
          console.error('Database error loading app settings:', dbError);
          // Fallback to default settings if database not available
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
      
      // Save to localStorage for now
      localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(updatedSettings));
      
      // Try to save to database if it's available
      try {
        // Check if the table exists
        const { count, error: countError } = await supabase
          .from('app_settings')
          .select('*', { count: 'exact', head: true });
        
        if (countError) {
          throw countError;
        }
        
        if (count === 0) {
          // No records, try to insert
          const { error: insertError } = await supabase
            .from('app_settings')
            .insert([updatedSettings as any]);
          
          if (insertError) throw insertError;
        } else {
          // Update existing record
          // Assume the first record is the one we want to update
          const { data: existingSettings, error: fetchError } = await supabase
            .from('app_settings')
            .select('id')
            .limit(1)
            .single();
          
          if (fetchError) throw fetchError;
          
          if (existingSettings && existingSettings.id) {
            const { error: updateError } = await supabase
              .from('app_settings')
              .update(updatedSettings as any)
              .eq('id', existingSettings.id);
            
            if (updateError) throw updateError;
          }
        }
      } catch (dbError) {
        console.warn('Could not save to database, continuing with localStorage only:', dbError);
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
    // Apply settings to CSS
    document.documentElement.style.setProperty('--color-primary', settingsToApply.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', settingsToApply.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', settingsToApply.accentColor);
    document.documentElement.style.setProperty('--font-family', settingsToApply.font);
    
    // Update favicon if provided
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
