
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

// Using Record<string, unknown> type for RPC calls
export async function callRpcFunction(fnName: string, params: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.rpc(fnName, params);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
