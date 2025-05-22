
import { supabase } from '@/integrations/supabase/client';

/**
 * Função para inserir um usuário no banco
 * @param {string} id - Id do usuário
 * @param {string} name - Nome do usuário
 * @param {string} email - Email do usuário
 * @param {string} role - Perfil do usuário
 * @returns {Promise<{success: boolean, error: any}>}
 */
export async function insertUser(id: string, name: string, email: string, role: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([{ id, name, email, role }]);
    
    return { success: !error, error };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Helper function for making RPC calls with proper typing
 * @param {string} fnName - Name of the RPC function to call
 * @param {Record<string, unknown>} params - Parameters for the RPC function
 * @returns {Promise<{data: any, error: any}>}
 */
export async function callRpcFunction(fnName: string, params: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.rpc(fnName, params);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Checks if a table exists in the database using the helper function
 * @param {string} tableName - Name of the table to check
 * @returns {Promise<boolean>}
 */
export async function checkIfTableExists(tableName: string): Promise<boolean> {
  const { data, error } = await callRpcFunction('check_if_table_exists', { table_name: tableName });
  
  if (error) {
    console.error('Erro ao verificar tabela:', error);
    return false;
  }
  
  return !!data;
}
