
import { supabase } from '@/integrations/supabase/client';

/**
 * Function to check if a table exists in the database
 * This is a workaround for the type system limitations
 */
export const checkIfTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Use raw SQL query to check if table exists
    const { data, error } = await supabase.rpc('check_if_table_exists', { table_name: tableName });
    
    if (error) {
      // If RPC is not available, use fallback method
      console.warn('RPC check_if_table_exists not available, using fallback method');
      
      // Fallback: try to select from the table and catch error
      try {
        // @ts-ignore - Using query method to bypass type checking
        const { error } = await supabase.from(tableName).select('*').limit(1);
        return !error;
      } catch {
        return false;
      }
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking if table exists:', error);
    return false;
  }
};

/**
 * Creates the app_settings table if it doesn't exist
 */
export const createAppSettingsTableIfNotExists = async () => {
  const tableExists = await checkIfTableExists('app_settings');
  
  if (!tableExists) {
    try {
      // We can't create tables from the client, but we can inform the user
      console.log('App settings table does not exist. Using localStorage only.');
      return false;
    } catch (error) {
      console.error('Error creating app settings table:', error);
      return false;
    }
  }
  
  return tableExists;
};
