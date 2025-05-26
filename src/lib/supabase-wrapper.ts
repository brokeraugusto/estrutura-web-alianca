/**
 * Wrapper personalizado para Supabase que evita conflitos de tipos
 * Esta abordagem isola completamente os tipos gerados do Supabase
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lvrhytzvodxdsgnlusuv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cmh5dHp2b2R4ZHNnbmx1c3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODgwMzMsImV4cCI6MjA2MzM2NDAzM30._KCfegTKjHsDe6dFAdFlxhTYnIzqMK3PaqfyR3q_PDM";

// Criar cliente único para evitar conflitos
const supabaseClient: SupabaseClient<any> = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Tipos personalizados para app_settings
export interface AppSettingsRow {
  id: number;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font: string;
  logo_url?: string | null;
  favicon_url?: string | null;
  created_at: string;
  updated_at: string;
}

// Tipos personalizados para budget_requests
export interface BudgetRequestRow {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  project_type: string;
  project_description: string | null;
  estimated_value: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  assigned_to: string | null;
}

// Tipos personalizados para profiles
export interface ProfileRow {
  id: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

// Tipos personalizados para service_categories
export interface ServiceCategoryRow {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

// Tipos personalizados para user_invitations
export interface UserInvitationRow {
  id: string;
  email: string;
  role: string;
  invited_by?: string | null;
  invited_at: string;
  expires_at: string;
  accepted: boolean;
  accepted_at?: string | null;
}

// Wrapper com métodos tipados
export const supabaseWrapper = {
  // Método para verificar se tabela existe
  async checkTableExists(tableName: string): Promise<boolean> {
    try {
      const { error } = await supabaseClient.from(tableName).select('*', { count: 'exact', head: true });
      return !error;
    } catch {
      return false;
    }
  },

  // Métodos para app_settings
  appSettings: {
    async get(): Promise<{data: AppSettingsRow | null, error: any}> {
      return supabaseClient.from('app_settings').select('*').maybeSingle();
    },
    
    async update(settings: Partial<AppSettingsRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('app_settings').update(settings).eq('id', 1);
    }
  },

  // Métodos para budget_requests
  budgetRequests: {
    async getAll(): Promise<{data: BudgetRequestRow[] | null, error: any}> {
      return supabaseClient.from('budget_requests').select('*').order('created_at', { ascending: false });
    },
    
    async getById(id: string): Promise<{data: BudgetRequestRow | null, error: any}> {
      return supabaseClient.from('budget_requests').select('*').eq('id', id).maybeSingle();
    },
    
    async create(data: Partial<BudgetRequestRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('budget_requests').insert([data]);
    },
    
    async update(id: string, data: Partial<BudgetRequestRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('budget_requests').update(data).eq('id', id);
    }
  },

  // Métodos para profiles
  profiles: {
    async getById(id: string): Promise<{data: ProfileRow | null, error: any}> {
      return supabaseClient.from('profiles').select('*').eq('id', id).maybeSingle();
    }
  },

  // Métodos para service_categories
  serviceCategories: {
    async getAll(): Promise<{data: ServiceCategoryRow[] | null, error: any}> {
      return supabaseClient.from('service_categories').select('*').order('name');
    },
    
    async create(data: Partial<ServiceCategoryRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('service_categories').insert([data]);
    },
    
    async update(id: string, data: Partial<ServiceCategoryRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('service_categories').update(data).eq('id', id);
    },
    
    async delete(id: string): Promise<{data: any, error: any}> {
      return supabaseClient.from('service_categories').delete().eq('id', id);
    }
  },

  // Métodos para user_invitations
  userInvitations: {
    async getAll(): Promise<{data: UserInvitationRow[] | null, error: any}> {
      return supabaseClient.from('user_invitations').select('*').order('invited_at', { ascending: false });
    },
    
    async create(data: Partial<UserInvitationRow>): Promise<{data: any, error: any}> {
      return supabaseClient.from('user_invitations').insert([data]);
    },
    
    async delete(id: string): Promise<{data: any, error: any}> {
      return supabaseClient.from('user_invitations').delete().eq('id', id);
    }
  },

  // Métodos para leads
  leads: {
    async getAll(): Promise<{data: any[] | null, error: any}> {
      return supabaseClient.from('leads').select('*').order('created_at', { ascending: false });
    },
    
    async create(data: any): Promise<{data: any, error: any}> {
      return supabaseClient.from('leads').insert([data]);
    },
    
    async update(id: string, data: any): Promise<{data: any, error: any}> {
      return supabaseClient.from('leads').update(data).eq('id', id);
    }
  },

  // Métodos de autenticação
  auth: {
    get user() {
      return supabaseClient.auth.getUser();
    },
    
    get session() {
      return supabaseClient.auth.getSession();
    },
    
    signInWithPassword(credentials: { email: string; password: string }) {
      return supabaseClient.auth.signInWithPassword(credentials);
    },
    
    signOut() {
      return supabaseClient.auth.signOut();
    },
    
    onAuthStateChange(callback: (event: any, session: any) => void) {
      return supabaseClient.auth.onAuthStateChange(callback);
    }
  },

  // Método para RPC calls
  async rpc<T = any>(fnName: string, params: Record<string, any> = {}): Promise<{data: T | null, error: any}> {
    try {
      return await supabaseClient.rpc(fnName, params);
    } catch (error) {
      return { data: null, error };
    }
  },

  // Método para storage
  storage: {
    from: (bucket: string) => supabaseClient.storage.from(bucket)
  },

  // Cliente raw para casos especiais
  get client() {
    return supabaseClient;
  }
};

// Export como default também para compatibilidade
export default supabaseWrapper;
