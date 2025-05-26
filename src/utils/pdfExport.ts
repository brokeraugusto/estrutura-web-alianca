
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { BudgetRequest } from '@/components/admin/budget/BudgetRequestList';
import { formatCurrency, formatDate, formatStatus, formatProjectType } from '@/lib/formatters';

// Extending the jsPDF type to include autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportBudgetToPDF = (budgetRequest: BudgetRequest, logoUrl?: string) => {
  const doc = new jsPDF();
  
  // Cores da empresa
  const primaryColor = [21, 57, 87]; // BlueDark
  const accentColor = [239, 68, 68]; // Orange accent
  
  // Adicionar logo se disponível
  if (logoUrl) {
    try {
      // Nota: Em produção, você precisaria carregar a imagem primeiro
      // doc.addImage(logoUrl, 'PNG', 20, 15, 40, 20);
    } catch (error) {
      console.log('Erro ao adicionar logo:', error);
    }
  }
  
  // Cabeçalho da empresa
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('ALIANÇA ESTRUTURAS', logoUrl ? 70 : 20, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Soluções em Estruturas Metálicas', logoUrl ? 70 : 20, 33);
  doc.text('contato@aliancaestruturas.com.br | (11) 9999-9999', logoUrl ? 70 : 20, 40);
  doc.text('www.aliancaestruturas.com.br', logoUrl ? 70 : 20, 47);
  
  // Linha separadora
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(2);
  doc.line(20, 55, 190, 55);
  
  // Título do documento
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('PROPOSTA COMERCIAL', 105, 70, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Proposta Nº: ${budgetRequest.id.substring(0, 8).toUpperCase()}`, 105, 80, { align: 'center' });
  doc.text(`Data de Emissão: ${formatDate(new Date().toISOString())}`, 105, 87, { align: 'center' });
  
  // Informações do cliente em caixa
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(20, 95, 170, 35);
  
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('DADOS DO CLIENTE', 25, 105);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Cliente: ${budgetRequest.client_name}`, 25, 115);
  doc.text(`Email: ${budgetRequest.client_email}`, 25, 122);
  doc.text(`Telefone: ${budgetRequest.client_phone || 'Não informado'}`, 105, 122);
  
  // Detalhes do projeto em caixa
  doc.rect(20, 140, 170, 60);
  
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('DETALHES DO PROJETO', 25, 150);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Tipo de Projeto: ${formatProjectType(budgetRequest.project_type)}`, 25, 160);
  
  // Descrição do projeto com quebra de linha
  const description = budgetRequest.project_description || 'Descrição não informada';
  const splitDescription = doc.splitTextToSize(description, 160);
  doc.text('Descrição:', 25, 170);
  
  let yPos = 177;
  splitDescription.forEach((line: string, index: number) => {
    if (yPos < 195) { // Evitar ultrapassar a caixa
      doc.text(line, 25, yPos);
      yPos += 7;
    }
  });
  
  // Informações comerciais
  doc.rect(20, 210, 170, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('INFORMAÇÕES COMERCIAIS', 25, 220);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Status: ${formatStatus(budgetRequest.status)}`, 25, 230);
  
  if (budgetRequest.estimated_value) {
    doc.setFontSize(12);
    doc.setTextColor(...accentColor);
    doc.text(`Valor Estimado: ${formatCurrency(budgetRequest.estimated_value)}`, 105, 230);
  } else {
    doc.text('Valor: A definir mediante análise técnica', 105, 230);
  }
  
  // Observações e condições
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('OBSERVAÇÕES:', 20, 250);
  doc.text('• Esta proposta tem validade de 30 dias a partir da data de emissão.', 20, 257);
  doc.text('• Os valores podem sofrer alterações mediante análise técnica detalhada.', 20, 264);
  doc.text('• Inclui projeto estrutural, fabricação e montagem (salvo especificado em contrário).', 20, 271);
  doc.text('• Garantia de 12 meses contra defeitos de fabricação.', 20, 278);
  
  // Rodapé
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(20, 285, 190, 285);
  
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text('Aliança Estruturas - Soluções em Estruturas Metálicas', 105, 292, { align: 'center' });
  doc.text(`© ${new Date().getFullYear()} - Todos os direitos reservados`, 105, 297, { align: 'center' });
  
  // Salvar o PDF
  doc.save(`proposta-${budgetRequest.id.substring(0, 8)}.pdf`);
};

export const exportBudgetListToPDF = (budgetRequests: BudgetRequest[], logoUrl?: string) => {
  const doc = new jsPDF();
  
  // Cores da empresa
  const primaryColor = [21, 57, 87];
  const accentColor = [239, 68, 68];
  
  // Adicionar logo se disponível
  if (logoUrl) {
    try {
      // doc.addImage(logoUrl, 'PNG', 20, 15, 40, 20);
    } catch (error) {
      console.log('Erro ao adicionar logo:', error);
    }
  }
  
  // Cabeçalho da empresa
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text('ALIANÇA ESTRUTURAS', logoUrl ? 70 : 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('contato@aliancaestruturas.com.br | (11) 9999-9999', logoUrl ? 70 : 20, 35);
  
  // Linha separadora
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(2);
  doc.line(20, 45, 190, 45);
  
  // Título do documento
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text('RELATÓRIO DE ORÇAMENTOS', 105, 58, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Data de Emissão: ${formatDate(new Date().toISOString())}`, 105, 68, { align: 'center' });
  
  // Criar tabela
  const tableColumn = ["Nº", "Cliente", "Tipo de Projeto", "Valor", "Status", "Data"];
  const tableRows = budgetRequests.map((budget, index) => [
    (index + 1).toString(),
    budget.client_name,
    formatProjectType(budget.project_type),
    budget.estimated_value ? formatCurrency(budget.estimated_value) : 'A definir',
    formatStatus(budget.status),
    formatDate(budget.created_at)
  ]);

  // Adicionar tabela ao documento
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 75,
    styles: { 
      fontSize: 9,
      cellPadding: 3
    },
    headStyles: { 
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: { 
      fillColor: [248, 249, 250] 
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 45 },
      2: { cellWidth: 40 },
      3: { cellWidth: 30 },
      4: { cellWidth: 25 },
      5: { cellWidth: 35 }
    }
  });
  
  // Rodapé
  const finalY = (doc as any).lastAutoTable.finalY || 200;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(20, finalY + 15, 190, finalY + 15);
  
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text('Aliança Estruturas - Soluções em Estruturas Metálicas', 105, finalY + 22, { align: 'center' });
  doc.text(`© ${new Date().getFullYear()} - Todos os direitos reservados`, 105, finalY + 27, { align: 'center' });
  
  // Salvar o PDF
  doc.save(`relatorio-orcamentos-${new Date().toISOString().split('T')[0]}.pdf`);
};
