
import { useState, useEffect } from 'react';
import { supabaseWrapper } from '@/lib/supabase-wrapper';
import { useToast } from '@/hooks/use-toast';
import { BudgetRequest } from '@/components/admin/budget/BudgetRequestList';

export function useBudgetRequests() {
  const [loading, setLoading] = useState(true);
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBudgetRequests();
  }, []);

  async function fetchBudgetRequests() {
    try {
      setLoading(true);
      console.log('Fetching budget requests...');
      
      const { data, error } = await supabaseWrapper.budgetRequests.getAll();
      
      if (error) {
        console.error('Error fetching budget requests:', error);
        throw error;
      }
      
      console.log('Budget requests fetched:', data);
      setBudgetRequests(data || []);
    } catch (error) {
      console.error('Error fetching budget requests:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar orçamentos",
        description: "Não foi possível carregar os orçamentos. Tente novamente mais tarde."
      });
    } finally {
      setLoading(false);
    }
  }

  // Extract unique project types for filter dropdown
  const projectTypes = Array.from(new Set(budgetRequests.map(request => request.project_type)));

  const filteredBudgetRequests = budgetRequests.filter(request => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      request.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.project_description && request.project_description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === '' || request.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === '' || request.project_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return {
    loading,
    budgetRequests: filteredBudgetRequests,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    projectTypes,
    fetchBudgetRequests
  };
}
