
// This file is automatically generated. Do not edit it directly.
// Use the supabaseWrapper instead for all Supabase operations
import { supabaseWrapper } from '@/lib/supabase-wrapper';

// Re-export the wrapper as supabase for compatibility
export const supabase = supabaseWrapper.client;

// Export the wrapper itself for better type safety
export { supabaseWrapper };
