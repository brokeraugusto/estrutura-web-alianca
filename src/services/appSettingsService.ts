
import { supabaseWrapper, type AppSettingsRow } from '@/lib/supabase-wrapper';
import { AppSettings, defaultSettings } from '@/types/appSettings';
import { checkIfTableExists } from '@/utils/dbFunctions';

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
      const { data: settingsData, error: fetchError } = await supabaseWrapper.appSettings.get();
      
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
      const updateData: Partial<AppSettingsRow> = {
        primaryColor: newSettings.primaryColor,
        secondaryColor: newSettings.secondaryColor,
        accentColor: newSettings.accentColor,
        font: newSettings.font,
        logoUrl: newSettings.logoUrl,
        faviconUrl: newSettings.faviconUrl
      };
      
      const updateResult = await supabaseWrapper.appSettings.update(updateData);
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
    
    const { error: uploadError } = await supabaseWrapper.storage
      .from('media')
      .upload(`${folder}/${fileName}`, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL for the uploaded file
    const { data } = supabaseWrapper.storage
      .from('media')
      .getPublicUrl(`${folder}/${fileName}`);
    
    return data.publicUrl;
  } catch (error) {
    console.error(`Erro ao fazer upload do ${folder === 'logos' ? 'logo' : 'favicon'}:`, error);
    return null;
  }
}
