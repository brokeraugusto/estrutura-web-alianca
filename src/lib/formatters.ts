
/**
 * Format a number as currency (BRL)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Format a date string to Brazilian format (DD/MM/YYYY)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

/**
 * Format a date string to Brazilian format with time (DD/MM/YYYY HH:MM)
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
}

/**
 * Format the project type to display name
 */
export function formatProjectType(type: string): string {
  switch(type) {
    case 'drywall': return 'Drywall';
    case 'steel-frame': return 'Steel Frame';
    case 'madeira': return 'Estrutura em Madeira';
    default: return type;
  }
}

/**
 * Format the status to display name
 */
export function formatStatus(status: string): string {
  switch(status) {
    case 'pendente': return 'Pendente';
    case 'em_analise': return 'Em análise';
    case 'aprovado': return 'Aprovado';
    case 'negado': return 'Negado';
    default: return status;
  }
}
