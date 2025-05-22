
// This file safely extends the Supabase types without modifying the generated types

import { SupabaseClient } from '@supabase/supabase-js';

// Define how app_settings interface without extending the Database type directly
export interface AppSettingsRow {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
}

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
