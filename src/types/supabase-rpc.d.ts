

// This file safely extends the Supabase types without modifying the generated types
import type { Database as GeneratedDatabase } from '@/integrations/supabase/types';

// Define app_settings interface
export interface AppSettingsTable {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
}

// Create an extended database type that includes app_settings
export type ExtendedDatabase = {
  public: GeneratedDatabase['public'] & {
    Tables: GeneratedDatabase['public']['Tables'] & {
      app_settings: {
        Row: AppSettingsTable;
        Insert: Partial<AppSettingsTable>;
        Update: Partial<AppSettingsTable>;
      };
    };
  };
};

// Extend the SupabaseClient RPC typing
declare module '@supabase/supabase-js' {
  interface SupabaseClient<
    Database = any,
    SchemaName extends string & keyof Database = 'public' extends keyof Database
      ? 'public'
      : string & keyof Database,
  > {
    rpc<Args extends Record<string, unknown> = Record<string, unknown>, ReturnType = any>(
      fn: string,
      params?: Args,
      options?: {
        head?: boolean;
        count?: null | 'exact' | 'planned' | 'estimated';
      }
    ): import('@supabase/supabase-js').PostgrestFilterBuilder<any, ReturnType, any>;
  }
}

