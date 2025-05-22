
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if a table exists in the database
 * @param tableName The name of the table to check
 * @returns Promise with boolean result
 */
export async function checkIfTableExists(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('check_if_table_exists', { table_name: tableName } as any);
    
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
