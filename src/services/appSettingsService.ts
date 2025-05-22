
import { supabase } from '@/integrations/supabase/client';
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
      // The table exists, safely fetch the data
      // Using type assertion to bypass TypeScript's strict checking
      const { data: settingsData, error: fetchError } = await supabase
        .from('app_settings' as any)
        .select('*')
        .maybeSingle();
      
      if (fetchError) {
        console.error('Erro ao buscar configurações:', fetchError);
        return settings;
      }
      
      if (settingsData) {
        // Ensure data is in the correct format
        const dbSettings: AppSettings = {
          primaryColor: (settingsData as any).primaryColor || defaultSettings.primaryColor,
          secondaryColor: (settingsData as any).secondaryColor || defaultSettings.secondaryColor,
          accentColor: (settingsData as any).accentColor || defaultSettings.accentColor,
          font: (settingsData as any).font || defaultSettings.font,
          logoUrl: (settingsData as any).logoUrl || defaultSettings.logoUrl,
          faviconUrl: (settingsData as any).faviconUrl || defaultSettings.faviconUrl,
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
      // Using type assertion to bypass TypeScript's strict checking
      const updateResult = await supabase
        .from('app_settings' as any)
        .update(newSettings)
        .eq('id', 1);
        
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
    
    // Manually build URL to avoid type dependencies
    const storageUrl = process.env.SUPABASE_URL || '';
    const url = `${storageUrl}/storage/v1/object/public/media/${folder}/${fileName}`;
    
    return url;
  } catch (error) {
    console.error(`Erro ao fazer upload do ${folder === 'logos' ? 'logo' : 'favicon'}:`, error);
    return null;
  }
}
