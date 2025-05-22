
import { supabase } from '@/integrations/supabase/client';
import { AppSettings, defaultSettings } from '@/types/appSettings';
import { checkIfTableExists } from '@/utils/dbFunctions';
import type { AppSettingsTable } from '@/types/supabase-rpc';

/**
 * Create a type-safe wrapper for app_settings table operations
 * This avoids direct reliance on database types
 */
const appSettingsTable = {
  async getSettings(): Promise<{data: AppSettingsTable | null, error: any}> {
    // Use the correct type cast to make TypeScript recognize this table
    return supabase.from('app_settings' as any).select('*').maybeSingle();
  },
  async updateSettings(settings: AppSettings): Promise<{data: any, error: any}> {
    // Use the correct type cast to make TypeScript recognize this table
    return supabase.from('app_settings' as any).update({
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      accentColor: settings.accentColor,
      font: settings.font,
      logoUrl: settings.logoUrl,
      faviconUrl: settings.faviconUrl
    }).eq('id', 1);
  }
};

export async function loadAppSettings(): Promise<AppSettings> {
  // First try to load from localStorage
  const savedSettings = localStorage.getItem('appSettings');
  let settings = defaultSettings;
  
  if (savedSettings) {
    try {
      settings = JSON.parse(savedSettings);
    } catch (error) {
      console.error('Erro ao carregar configurações do localStorage:', error);
    }
  }
  
  // Then try to get from database (more current version)
  try {
    const tableExists = await checkIfTableExists('app_settings');
    
    if (tableExists) {
      // The table exists, safely fetch the data with type-safe wrapper
      const { data: settingsData, error: fetchError } = await appSettingsTable.getSettings();
      
      if (fetchError) {
        console.error('Erro ao buscar configurações:', fetchError);
        return settings;
      }
      
      if (settingsData) {
        // Map database fields to AppSettings
        const dbSettings: AppSettings = {
          primaryColor: settingsData.primaryColor || defaultSettings.primaryColor,
          secondaryColor: settingsData.secondaryColor || defaultSettings.secondaryColor,
          accentColor: settingsData.accentColor || defaultSettings.accentColor,
          font: settingsData.font || defaultSettings.font,
          logoUrl: settingsData.logoUrl || defaultSettings.logoUrl,
          faviconUrl: settingsData.faviconUrl || defaultSettings.faviconUrl,
        };
        
        localStorage.setItem('appSettings', JSON.stringify(dbSettings));
        return dbSettings;
      }
    } else {
      // The table doesn't exist, using only default settings or localStorage
      console.log('Tabela app_settings não encontrada, usando configurações padrão');
    }
  } catch (error) {
    console.error('Erro ao carregar configurações do banco de dados:', error);
  }
  
  return settings;
}

export async function saveAppSettings(newSettings: AppSettings): Promise<boolean> {
  try {
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
    
    // Check if table exists before trying to update
    const tableExists = await checkIfTableExists('app_settings');
    
    if (tableExists) {
      const updateResult = await appSettingsTable.updateSettings(newSettings);
      if (updateResult.error) throw updateResult.error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    return false;
  }
}

export async function uploadMedia(file: File, folder: 'logos' | 'favicons'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder === 'logos' ? 'logo' : 'favicon'}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(`${folder}/${fileName}`, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL for the uploaded file
    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(`${folder}/${fileName}`);
    
    return data.publicUrl;
  } catch (error) {
    console.error(`Erro ao fazer upload do ${folder === 'logos' ? 'logo' : 'favicon'}:`, error);
    return null;
  }
}
