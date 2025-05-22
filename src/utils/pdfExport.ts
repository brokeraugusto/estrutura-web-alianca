
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BudgetRequest } from '@/components/admin/budget/BudgetRequestList';
import { formatCurrency, formatDate, formatStatus, formatProjectType } from '@/lib/formatters';

// Estendendo o tipo jsPDF para incluir autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportBudgetToPDF = (budgetRequest: BudgetRequest) => {
  const doc = new jsPDF();
  
  // Adicionar cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(21, 57, 87); // BlueDark
  doc.text('Aliança Estruturas', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Detalhes do Orçamento', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Data de Emissão: ${formatDate(new Date().toISOString())}`, 105, 40, { align: 'center' });
  
  // Informações do cliente
  doc.setFontSize(12);
  doc.setTextColor(21, 57, 87);
  doc.text('Informações do Cliente', 20, 55);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text(`Cliente: ${budgetRequest.client_name}`, 20, 65);
  doc.text(`Email: ${budgetRequest.client_email}`, 20, 72);
  doc.text(`Telefone: ${budgetRequest.client_phone || 'Não informado'}`, 20, 79);
  
  // Informações do projeto
  doc.setFontSize(12);
  doc.setTextColor(21, 57, 87);
  doc.text('Detalhes do Projeto', 20, 95);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text(`Tipo de Projeto: ${formatProjectType(budgetRequest.project_type)}`, 20, 105);
  
  // Descrição do projeto (com quebra de linha se necessário)
  const description = budgetRequest.project_description || 'Não informado';
  const splitDescription = doc.splitTextToSize(description, 170);
  doc.text(`Descrição: ${splitDescription[0]}`, 20, 112);
  
  if (splitDescription.length > 1) {
    for (let i = 1; i < splitDescription.length && i < 10; i++) {
      doc.text(splitDescription[i], 20, 112 + (i * 7));
    }
  }
  
  // Status e valor
  let yPos = 112 + (Math.min(splitDescription.length, 10) * 7) + 10;
  
  doc.text(`Status: ${formatStatus(budgetRequest.status)}`, 20, yPos);
  doc.text(`Valor Estimado: ${budgetRequest.estimated_value ? formatCurrency(budgetRequest.estimated_value) : 'Não definido'}`, 20, yPos + 7);
  doc.text(`Data de Criação: ${formatDate(budgetRequest.created_at)}`, 20, yPos + 14);
  doc.text(`Última Atualização: ${formatDate(budgetRequest.updated_at)}`, 20, yPos + 21);
  
  // Rodapé
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Este documento é uma estimativa e está sujeito a alterações.', 105, 270, { align: 'center' });
  doc.text('Aliança Estruturas © ' + new Date().getFullYear(), 105, 277, { align: 'center' });
  doc.text('contato@aliancaestruturas.com.br | (11) 9999-9999', 105, 284, { align: 'center' });
  
  // Salvar o PDF
  doc.save(`orcamento-${budgetRequest.id}.pdf`);
};

export const exportBudgetListToPDF = (budgetRequests: BudgetRequest[]) => {
  const doc = new jsPDF();
  
  // Adicionar cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(21, 57, 87); // BlueDark
  doc.text('Aliança Estruturas', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Lista de Orçamentos', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Data de Emissão: ${formatDate(new Date().toISOString())}`, 105, 40, { align: 'center' });
  
  // Criar tabela
  const tableColumn = ["ID", "Cliente", "Tipo de Projeto", "Valor", "Status", "Data"];
  const tableRows = budgetRequests.map((budget, index) => [
    (index + 1).toString(),
    budget.client_name,
    formatProjectType(budget.project_type),
    budget.estimated_value ? formatCurrency(budget.estimated_value) : 'Não definido',
    formatStatus(budget.status),
    formatDate(budget.created_at)
  ]);

  // Adicionar tabela ao documento
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [21, 57, 87] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });
  
  // Rodapé
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Este documento é uma estimativa e está sujeito a alterações.', 105, 270, { align: 'center' });
  doc.text('Aliança Estruturas © ' + new Date().getFullYear(), 105, 277, { align: 'center' });
  doc.text('contato@aliancaestruturas.com.br | (11) 9999-9999', 105, 284, { align: 'center' });
  
  // Salvar o PDF
  doc.save(`lista-orcamentos-${new Date().toISOString().split('T')[0]}.pdf`);
};
