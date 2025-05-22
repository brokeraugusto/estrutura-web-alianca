
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if a table exists in the database
 * @param {string} tableName - Name of the table to check
 * @returns {Promise<boolean>}
 */
export async function checkIfTableExists(tableName: string): Promise<boolean> {
  try {
    // Query the information_schema directly instead of using an RPC function
    // since there seems to be an issue with the RPC function
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao verificar tabela:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Erro ao verificar tabela:', error);
    return false;
  }
}

/**
 * Helper function for making RPC calls with proper typing
 * @param {string} fnName - Name of the RPC function to call
 * @param {Record<string, unknown>} params - Parameters for the RPC function
 * @returns {Promise<{data: any, error: any}>}
 */
export async function callRpcFunction<T = any>(
  fnName: string, 
  params: Record<string, unknown>
): Promise<{data: T | null, error: any}> {
  try {
    const { data, error } = await supabase.rpc<typeof params, T>(fnName, params);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
