
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

// Simple RPC helper function type
export type SupabaseRpcFunction<T = any> = (
  fnName: string,
  params?: Record<string, unknown>
) => Promise<{data: T | null, error: any}>;
