
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Loader2, FilePdf } from 'lucide-react';
import { formatCurrency, formatDate, formatStatus, formatProjectType } from '@/lib/formatters';
import { exportBudgetToPDF } from '@/utils/pdfExport';

export interface BudgetRequest {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  project_type: string;
  project_description: string | null;
  estimated_value: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface BudgetRequestListProps {
  budgetRequests: BudgetRequest[];
  loading: boolean;
  onViewDetails: (budgetRequest: BudgetRequest) => void;
}

export const BudgetRequestList: React.FC<BudgetRequestListProps> = ({ 
  budgetRequests, 
  loading,
  onViewDetails
}) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'em_analise': return 'bg-blue-100 text-blue-800';
      case 'negado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportPDF = (budgetRequest: BudgetRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    exportBudgetToPDF(budgetRequest);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-blueDark" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Projeto</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetRequests.length > 0 ? (
            budgetRequests.map((request, index) => (
              <TableRow 
                key={request.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onViewDetails(request)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{request.client_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatProjectType(request.project_type)}
                </TableCell>
                <TableCell>
                  {request.estimated_value ? formatCurrency(request.estimated_value) : 'Não definido'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {formatStatus(request.status)}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(request.created_at)}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="Ver Detalhes"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(request);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="Baixar PDF"
                      onClick={(e) => handleExportPDF(request, e)}
                    >
                      <FilePdf className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                Nenhum orçamento encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
