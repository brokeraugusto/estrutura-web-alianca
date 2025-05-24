
/**
 * Wrapper personalizado para Supabase que evita conflitos de tipos
 * Esta abordagem isola completamente os tipos gerados do Supabase
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lvrhytzvodxdsgnlusuv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cmh5dHp2b2R4ZHNnbmx1c3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODgwMzMsImV4cCI6MjA2MzM2NDAzM30._KCfegTKjHsDe6dFAdFlxhTYnIzqMK3PaqfyR3q_PDM";

// Criar cliente sem tipos específicos para evitar conflitos
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Tipos personalizados para app_settings
export interface AppSettingsRow {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
}

// Wrapper com métodos tipados
export const supabaseWrapper = {
  // Método para verificar se tabela existe
  async checkTableExists(tableName: string): Promise<boolean> {
    try {
      const { error } = await (supabaseClient as any).from(tableName).select('*', { count: 'exact', head: true });
      return !error;
    } catch {
      return false;
    }
  },

  // Métodos para app_settings
  appSettings: {
    async get(): Promise<{data: AppSettingsRow | null, error: any}> {
      return (supabaseClient as any).from('app_settings').select('*').maybeSingle();
    },
    
    async update(settings: Partial<AppSettingsRow>): Promise<{data: any, error: any}> {
      return (supabaseClient as any).from('app_settings').update(settings).eq('id', 1);
    }
  },

  // Método para RPC calls
  async rpc<T = any>(fnName: string, params: Record<string, any> = {}): Promise<{data: T | null, error: any}> {
    try {
      return await (supabaseClient as any).rpc(fnName, params);
    } catch (error) {
      return { data: null, error };
    }
  },

  // Método para storage
  storage: {
    from: (bucket: string) => (supabaseClient as any).storage.from(bucket)
  },

  // Cliente raw para casos especiais
  get client() {
    return supabaseClient;
  }
};
