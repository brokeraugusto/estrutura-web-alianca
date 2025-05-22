
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BudgetRequestForm } from '@/components/admin/budget/BudgetRequestForm';
import { BudgetRequestList } from '@/components/admin/budget/BudgetRequestList';
import { BudgetFilters } from '@/components/admin/budget/BudgetFilters';
import { useBudgetRequests } from '@/hooks/useBudgetRequests';

const Orcamentos: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { 
    loading, 
    budgetRequests, 
    searchQuery, 
    setSearchQuery,
    statusFilter, 
    setStatusFilter,
    typeFilter, 
    setTypeFilter,
    projectTypes,
    fetchBudgetRequests
  } = useBudgetRequests();

  const handleBudgetCreated = () => {
    setDialogOpen(false);
    fetchBudgetRequests();
  };

  return (
    <DashboardLayout activeTab="orcamentos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Orçamentos</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blueDark hover:bg-[#0f2435] text-white">
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
            </DialogHeader>
            <BudgetRequestForm 
              onSuccess={handleBudgetCreated} 
              onCancel={() => setDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtros e busca */}
      <BudgetFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        projectTypes={projectTypes}
      />
      
      {/* Tabela de orçamentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <BudgetRequestList 
          budgetRequests={budgetRequests} 
          loading={loading} 
        />
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {budgetRequests.length} de {budgetRequests.length} orçamentos
          </p>
          {/* Pagination can be added here when needed */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orcamentos;
