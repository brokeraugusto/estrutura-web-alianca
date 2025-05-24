
import { supabaseWrapper } from '@/lib/supabase-wrapper';

/**
 * Checks if a table exists in the database
 * @param {string} tableName - Name of the table to check
 * @returns {Promise<boolean>}
 */
export async function checkIfTableExists(tableName: string): Promise<boolean> {
  try {
    return await supabaseWrapper.checkTableExists(tableName);
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
  params: Record<string, unknown> = {}
): Promise<{data: T | null, error: any}> {
  return await supabaseWrapper.rpc<T>(fnName, params);
}
