
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BudgetRequestForm } from '@/components/admin/budget/BudgetRequestForm';
import { BudgetRequestList, BudgetRequest } from '@/components/admin/budget/BudgetRequestList';
import { BudgetFilters } from '@/components/admin/budget/BudgetFilters';
import { BudgetRequestDetail } from '@/components/admin/budget/BudgetRequestDetail';
import { useBudgetRequests } from '@/hooks/useBudgetRequests';
import { exportBudgetListToPDF } from '@/utils/pdfExport';
import { FileDown } from 'lucide-react';

const Orcamentos: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRequest | null>(null);
  
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

  const handleViewDetails = (budgetRequest: BudgetRequest) => {
    setSelectedBudget(budgetRequest);
    setDetailDialogOpen(true);
  };

  const handleDetailClose = () => {
    setDetailDialogOpen(false);
    setSelectedBudget(null);
  };

  const handleBudgetUpdated = () => {
    fetchBudgetRequests();
    setDetailDialogOpen(false);
  };
  
  const handleExportAllToPDF = () => {
    exportBudgetListToPDF(budgetRequests);
  };

  return (
    <DashboardLayout activeTab="orcamentos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Orçamentos</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportAllToPDF}
          >
            <FileDown className="h-4 w-4" />
            Exportar PDF
          </Button>
          
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
          onViewDetails={handleViewDetails}
        />
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {budgetRequests.length} de {budgetRequests.length} orçamentos
          </p>
          {/* Pagination can be added here when needed */}
        </div>
      </div>

      {/* Budget detail dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <BudgetRequestDetail 
            budgetRequest={selectedBudget} 
            onClose={handleDetailClose}
            onSave={handleBudgetUpdated}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Orcamentos;
