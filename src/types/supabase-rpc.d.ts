
// This file safely extends the Supabase types without modifying the generated types

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

// Simple RPC helper function type
export type SupabaseRpcFunction<T = any> = (
  fnName: string,
  params?: Record<string, unknown>
) => Promise<{data: T | null, error: any}>;
