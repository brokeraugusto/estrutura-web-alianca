
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
        // Map database fields to AppSettings (snake_case to camelCase)
        const dbSettings: AppSettings = {
          primaryColor: settingsData.primary_color || defaultSettings.primaryColor,
          secondaryColor: settingsData.secondary_color || defaultSettings.secondaryColor,
          accentColor: settingsData.accent_color || defaultSettings.accentColor,
          font: settingsData.font || defaultSettings.font,
          logoUrl: settingsData.logo_url || defaultSettings.logoUrl,
          logoLightUrl: settingsData.logo_light_url || defaultSettings.logoLightUrl,
          logoDarkUrl: settingsData.logo_dark_url || defaultSettings.logoDarkUrl,
          faviconUrl: settingsData.favicon_url || defaultSettings.faviconUrl,
          whatsappNumber: settingsData.whatsapp_number || defaultSettings.whatsappNumber,
          whatsappMessage: settingsData.whatsapp_message || defaultSettings.whatsappMessage,
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
      // Map camelCase to snake_case for database
      const updateData: Partial<AppSettingsRow> = {
        primary_color: newSettings.primaryColor,
        secondary_color: newSettings.secondaryColor,
        accent_color: newSettings.accentColor,
        font: newSettings.font,
        logo_url: newSettings.logoUrl,
        logo_light_url: newSettings.logoLightUrl,
        logo_dark_url: newSettings.logoDarkUrl,
        favicon_url: newSettings.faviconUrl,
        whatsapp_number: newSettings.whatsappNumber,
        whatsapp_message: newSettings.whatsappMessage
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

export async function uploadMedia(file: File, folder: 'logos' | 'favicons' | 'logos-light' | 'logos-dark'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder.replace('-', '_')}-${Date.now()}.${fileExt}`;
    
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
    console.error(`Erro ao fazer upload do arquivo:`, error);
    return null;
  }
}
