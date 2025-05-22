import { Database } from '@/integrations/supabase/types';
import { SupabaseClient } from '@supabase/supabase-js';

// Extend the SupabaseClient RPC typing
declare module '@supabase/supabase-js' {
  interface SupabaseClient<
    Database = any,
    SchemaName extends string & keyof Database = 'public' extends keyof Database
      ? 'public'
      : string & keyof Database,
  > {
    rpc<Args extends Record<string, unknown> = Record<string, unknown>>(
      fn: string,
      params?: Args,
      options?: {
        head?: boolean;
        count?: null | 'exact' | 'planned' | 'estimated';
      }
    ): import('@supabase/supabase-js').PostgrestFilterBuilder<any, any, any>;
  }
}

// Type for app_settings table (since it's not in the auto-generated types)
declare global {
  interface AppSettings {
    id?: number;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    font: string;
    logoUrl?: string;
    faviconUrl?: string;
  }
}

// Extend the Supabase Database type to include our custom tables
declare module '@/integrations/supabase/types' {
  interface Database {
    public: {
      Tables: {
        // Keep existing tables
        budget_requests: any;
        leads: any;
        profiles: any;
        projects: any;
        // Add app_settings
        app_settings: {
          Row: AppSettings;
          Insert: Omit<AppSettings, 'id'>;
          Update: Partial<AppSettings>;
          Relationships: [];
        };
      };
    };
  }
}
