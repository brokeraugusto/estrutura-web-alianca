
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if a table exists in the database
 * @param {string} tableName - Name of the table to check
 * @returns {Promise<boolean>}
 */
export async function checkIfTableExists(tableName: string): Promise<boolean> {
  try {
    // Execute a more reliable query that works with Supabase's restrictions
    const { data, error } = await supabase.rpc('check_table_exists', { table_name: tableName });
    
    if (error) {
      // Se falhar o RPC, tentamos uma abordagem alternativa
      console.error('Erro ao verificar tabela:', error);
      
      // Como fallback, tentamos fazer um select para ver se a tabela existe
      try {
        // Usando any para contornar problemas de tipos com tabelas dinâmicas
        const { count, error: countError } = await supabase
          .from(tableName as any)
          .select('*', { count: 'exact', head: true });
          
        // Se não der erro, a tabela existe
        return !countError;
      } catch {
        return false;
      }
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
